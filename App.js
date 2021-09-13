import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import ShopNavigator from './navigation/ShopNavigator';
import productReducer from './store/reducers/productsReducer';
import CartReducer from './store/reducers/cartReducer';
import OrderReducer from './store/reducers/orderReducers';

const rootReducer = combineReducers({
  products: productReducer,
  cart: CartReducer,
  orders: OrderReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded) {
    return (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => setFontLoaded(true)}
          onError={err => console.log(err)}
        />
    )
  }

  return (
    <Provider store={store}>
        <StatusBar style="auto" />
        <ShopNavigator />
    </Provider>
  );
}
