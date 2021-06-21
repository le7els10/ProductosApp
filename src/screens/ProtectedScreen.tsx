import React, {useContext} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const ProtectedScreen = () => {
  const {user, token, logOut} = useContext(AuthContext);

  return (
    <View style={style.constainer}>
      <Text style={style.title}>Protected screen</Text>
      <Button title="log out" onPress={logOut} />

      <Text>{JSON.stringify(user, null, 5)}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  constainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ProtectedScreen;
