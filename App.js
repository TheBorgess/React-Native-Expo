

// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UsersList from './pages/UsersList';
import User from './pages/User';
import UserDetail from './pages/UserDetail';
import Task from './Task';


function UserLogin() {
  return (
    <Login />
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Tasks" component={Task} />
        <Stack.Screen name="UsersList" component={UsersList} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="UserDetail" component={UserDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;