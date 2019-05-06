import {
  FETCH_HEROES_BEGIN,
  FETCH_HEROES_SUCCESS,
  FETCH_HEROES_FAILURE,
  FETCH_HERO_BY_ID_BEGIN,
  FETCH_HERO_BY_ID_SUCCESS,
  FETCH_HERO_BY_ID_FAILURE
} from './types';
import moment from 'moment'
import CryptoJS from 'crypto-js';
import { marvelApi as config } from '../config';


const marvelURL = 'https://developer.marvel.com/v1/public/characters',
      charactersUrl = 'https://gateway.marvel.com/v1/public/characters',
      defaultOptions = { page: 0, count: 20, name: '', nameStartsWith: '' },
      pk = config.publicKey,
      prk = config.privateKey;

export const fetchHeroesBegin = () => ({
  type: FETCH_HEROES_BEGIN
});

export const fetchHeroesSuccess = heroes => ({
  type: FETCH_HEROES_SUCCESS,
  payload: { heroes }
});

export const fetchHeroesFailure = error => ({
  type: FETCH_HEROES_FAILURE,
  payload: { error }
});

export function fetchHeroes() {
  let timeStamp = moment().unix();
  let hash = CryptoJS.MD5(timeStamp + prk + pk).toString(CryptoJS.enc.Hex);
  let params = `?apikey=${pk}&ts=${timeStamp}&hash=${hash}`;
  let url = `${charactersUrl}${params}`;
  return dispatch => {
    dispatch(fetchHeroesBegin());
    return fetch(url)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchHeroesSuccess(json.data.results));
        return json.data.results;
      })
      .catch(error => dispatch(fetchHeroesFailure(error)));
  };
}

export const fetchHeroByIDBegin = () => ({
  type: FETCH_HERO_BY_ID_BEGIN
});

export const fetchHeroByIDSuccess = hero => ({
  type: FETCH_HERO_BY_ID_SUCCESS,
  payload: { hero }
});

export const fetchHeroByIDFailure = error => ({
  type: FETCH_HERO_BY_ID_FAILURE,
  payload: { error }
});

export function fetchHeroByID(characterId = 0) {
  let timeStamp = moment().unix();
  let hash = CryptoJS.MD5(timeStamp + prk + pk).toString(CryptoJS.enc.Hex);
  let params = `${characterId}?apikey=${pk}&ts=${timeStamp}&hash=${hash}`;
  let url = `${charactersUrl}/${params}`;
  return dispatch => {
    dispatch(fetchHeroByIDBegin());
    return fetch(url)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchHeroByIDSuccess(json.data.results[0]));
        return json.data.results;
      })
      .catch(error => dispatch(fetchHeroByIDFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}