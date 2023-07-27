import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [axiosError, setAxiosError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [splashLoading, setSplashLoading] = useState(false);

  const login = (email, password) => {
    setIsLoading(true);
    setAxiosError(false);
    axios
      .post(`${BASE_URL}/drivers/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          email: email,
          password: password,
        },
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo.driver);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo.driver));
        setIsLoading(false);
      })
      .catch(err => {
        setAxiosError(err.response.data.error);
        setIsLoading(false);
        console.log('Login Error:', err);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (err) {
      setSplashLoading(false);
      console.log('Is user logged in error: ', err);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        isLoggedIn,
        axiosError,
        isLoading,
        splashLoading,
        userInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
