import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNav from './src/Public/Navigators/MainNav';
// import {decode, encode} from 'base-64';
// import Header from './src/Components/Header';
// import {YellowBox} from 'react-native';
// import _ from 'lodash';

import {Provider} from 'react-redux';
import store from './src/Public/Redux/store';
console.disableYellowBox = true;

// YellowBox.ignoreWarnings(['Setting a timer']);
// const _console = _.clone(console);
// console.warn = message => {
//   if (message.indexOf('Setting a timer') <= -1) {
//     _console.warn(message);
//   }
// };

const App = () => {
  // if (!global.btoa) {
  //   global.btoa = encode;
  // }

  // if (!global.atob) {
  //   global.atob = decode;
  // }
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <Header /> */}
        <MainNav />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
