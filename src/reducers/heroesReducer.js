import {
  FETCH_HEROES_BEGIN,
  FETCH_HEROES_SUCCESS,
  FETCH_HEROES_FAILURE,
  FETCH_HERO_BY_ID_BEGIN,
  FETCH_HERO_BY_ID_SUCCESS,
  FETCH_HERO_BY_ID_FAILURE
} from '../actions/types';

const initialState = {
  heroList: [],
  heroData: null,
  loadingHeroes: false,
  errorFetchingHeroes: null,
  loadingHero: false,
  errorFetchingHero: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_HEROES_BEGIN:
      // Mark the state as "loadingHeroes" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loadingHeroes: true,
        errorFetchingHeroes: null
      };

    case FETCH_HEROES_SUCCESS:
    // All done: set loadingHeroes "false".
    // Also, replace the items with the ones from the server
      return {
        ...state,
        loadingHeroes: false,
        heroList: action.payload.heroes
      };
    
    case FETCH_HEROES_FAILURE:
      // The request failed. It's done. So set loadingHeroes to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loadingHeroes: false,
        errorFetchingHeroes: action.payload.error,
        heroList: []
      };

    case FETCH_HERO_BY_ID_BEGIN:
      return {
        ...state,
        loadingHero: true,
        errorFetchingHero: null
      };

    case FETCH_HERO_BY_ID_SUCCESS:
      return {
        ...state,
        loadingHero: false,
        heroData: action.payload.hero
      };
    
    case FETCH_HERO_BY_ID_FAILURE:
      return {
        ...state,
        loadingHero: false,
        errorFetchingHero: action.payload.error,
        heroData: {}
      };

    default: 
      // ALWAYS have a default case in a reducer
      return state;
  }
}
