import React from 'react';

import { LogBox } from 'react-native';

////import { createAppContainer } from '@react-navigation/native';
////import { createStackNavigator } from '@react-navigation/stack';

import News from './screen/News';

LogBox.ignoreAllLogs();

const App = () => {
     return(
       <>
          <News /> 
       </>
     );
}

export default App;
