
import React from 'react';

import ReactDOM from 'react-dom';

import { createStore} from 'redux';

import { Provider } from 'react-redux';

import productReducer from "./reducers/reducers";

//import thunkMiddleware from 'redux-thunk';

//import thunk from 'redux-thunk';

import  ProductList  from "./components/ProductList";



const Main = () => {

  return (

    <div>

      <ProductList />

    </div>

  )

};



const store = createStore(productReducer);



ReactDOM.render(

  <Provider store={store}>

    <Main />

  </Provider>,

  document.getElementById('root')

);
