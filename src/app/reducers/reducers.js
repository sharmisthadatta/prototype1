import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE
} from '../actions/actions.js';

const initialState = {
  items: [],
  ////loading: false,
  //error: null
};

const productReducer=(state = initialState, action)=> {
  debugger;
  switch(action.type) {
    case FETCH_PRODUCTS_BEGIN:
        return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PRODUCTS_SUCCESS:{

          const newState = Object.assign({}, state);
          newState.items=action.payload.products;
          return newState;

      };

    case FETCH_PRODUCTS_FAILURE:

      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
};

export default productReducer;
