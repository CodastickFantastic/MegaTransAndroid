import React, {useContext} from 'react';
import {View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardView from '../views/DashboardView';
import LoginView from '../views/LoginView';

import {AuthContext} from '../context/AuthContext';
import SplashView from '../views/SplashView';

const Stack = createNativeStackNavigator();

function Navigation() {
  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {splashLoading ? (
          <Stack.Screen name="SplashView" component={SplashView} />
        ) : userInfo.accessToken ? (
          <Stack.Screen name="Dashboard" component={DashboardView} />
        ) : (
          <Stack.Screen name="Login" component={LoginView} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
