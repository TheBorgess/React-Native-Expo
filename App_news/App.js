import React from 'react';

import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import News from './screen/News';

//const stackNavigator = createStackNavigator({
    
//     News: News

//});

//const App = createAppContainer(stackNavigator);

const App = () => {
     return(
       <>
         <News />
       </>
     )
}

export default App;
