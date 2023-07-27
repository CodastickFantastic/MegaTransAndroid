import React from 'react';
import {ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function SplashView() {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#121316'}}>
      <ActivityIndicator size="large" color="#DD6C15" />
    </SafeAreaView>
  );
}

export default SplashView;
