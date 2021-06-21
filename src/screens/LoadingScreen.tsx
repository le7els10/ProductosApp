import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={50} color="#000" />
    </View>
  );
};

export default LoadingScreen;
