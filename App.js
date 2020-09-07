import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ShopNavigator from './Navigation/ShopNavigator';
import ReduxThunk from 'redux-thunk';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
// import { composeWithDevTools } from 'redux-devtools-extension';
import NavigationContainer from './Navigation/NavigationContainer';
const rootReducer = combineReducers({
  product : productsReducer,
  cart : cartReducer,
  orders : ordersReducer,
  auth : authReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store = {store}>
      <NavigationContainer />
    </Provider>
  );
  }