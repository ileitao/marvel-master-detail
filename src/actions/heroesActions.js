import {
  FETCH_HEROES_BEGIN,
  FETCH_HEROES_SUCCESS,
  FETCH_HEROES_FAILURE
} from './types';
import moment from 'moment'
import CryptoJS from 'crypto-js';
import { marvelApi as config } from '../config';


const marvelURL = 'http://developer.marvel.com/v1/public/characters',
      charactersUrl = 'http://gateway.marvel.com/v1/public/characters',
      timeStamp = moment().unix(),
      defaultOptions = { page: 0, count: 20, name: '', nameStartsWith: '' },
      hash = CryptoJS.MD5(timeStamp + 'dafc7de0618ac661416f14ac94752cd4f58ca5f5' + '68f10e0c383ac66c521330b8291a4a08')
      .toString(CryptoJS.enc.Hex),
      pk = '68f10e0c383ac66c521330b8291a4a08',
      prk = 'dafc7de0618ac661416f14ac94752cd4f58ca5f5';

//let params = `?apikey=${pk}&ts=${timeStamp}&hash=${hash}&limit=${defaultOptions.count}`
let params = `?apikey=${pk}&ts=${timeStamp}&hash=${hash}`

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

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}