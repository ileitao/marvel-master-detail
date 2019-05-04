import {
  FETCH_HEROES_BEGIN,
  FETCH_HEROES_SUCCESS,
  FETCH_HEROES_FAILURE
} from './types';

// const marvelURL = 'https://gateway.marvel.com/v1/public/',
const marvelURL = 'https://developer.marvel.com/v1/public/',
      apiKey = `apikey=${process.env.REACT_APP_PUBLIC_API_KEY}`;

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
  let url = `${marvelURL}characters?${apiKey}`;
  return dispatch => {
    dispatch(fetchHeroesBegin());
    return fetch(url)
      .then(handleErrors)
      .then(json => console.log(json))
      // .then(json => {
      //   dispatch(fetchHeroesSuccess(json.heroes));
      //   return json.heroes;
      // })
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