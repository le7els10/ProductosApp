import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useContext} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import Background from '../components/Background';
import WhiteLogo from '../components/WhiteLogo';
import {AuthContext} from '../context/AuthContext';
import {useForm} from '../hooks/useForm';
import {loginStyle} from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> {}

const LoginScreen = ({navigation}: Props) => {
  const {singIn, errorMessage, removeError} = useContext(AuthContext);

  const {email, pass, onChange} = useForm({
    email: '',
    pass: '',
  });

  const onLogin = () => {
    Keyboard.dismiss();
    singIn({correo: email, password: pass});
  };

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Login incorrecto', errorMessage, [
      {text: 'ok', onPress: removeError},
    ]);
  }, [errorMessage]);

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyle.formContainer}>
          {/* Keyboard avoid */}
          <WhiteLogo />
          <Text style={loginStyle.title}>Login</Text>
          <Text style={loginStyle.label}>Correo</Text>
          <TextInput
            placeholder="Ingrese su correo"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            selectionColor="#fff"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={value => onChange(value, 'email')}
            style={loginStyle.inputField}
          />
          <Text style={loginStyle.label}>Contraseña</Text>
          <TextInput
            secureTextEntry={true}
            placeholder="**********"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            selectionColor="#fff"
            autoCapitalize="none"
            autoCorrect={false}
            value={pass}
            onChangeText={value => onChange(value, 'pass')}
            style={loginStyle.inputField}
          />

          <View style={loginStyle.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyle.button}
              onPress={onLogin}>
              <Text style={loginStyle.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={loginStyle.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('Register')}>
              <Text style={loginStyle.buttonText}>Nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
