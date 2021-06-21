import React from 'react';
import {Text, View, Image} from 'react-native';

const WhiteLogo = () => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <Image
        source={require('../assets/images/react-logo-white.png')}
        style={{
          width: 110,
          height: 100,
        }}
      />
    </View>
  );
};

export default WhiteLogo;
