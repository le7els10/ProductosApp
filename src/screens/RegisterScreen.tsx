import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {useEffect} from 'react';
import {Keyboard, TextInput} from 'react-native';
import {Alert} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import WhiteLogo from '../components/WhiteLogo';
import {AuthContext} from '../context/AuthContext';
import {useForm} from '../hooks/useForm';
import {loginStyle} from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> {}

const RegisterScreen = ({navigation}: Props) => {
  const {singUp, errorMessage, removeError} = useContext(AuthContext);
  const {email, pass, name, onChange} = useForm({
    email: '',
    pass: '',
    name: '',
  });
  const onRegister = () => {
    singUp({
      nombre: name,
      correo: email,
      password: pass,
    });
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Registro incorrecto', errorMessage, [
      {text: 'ok', onPress: removeError},
    ]);
  }, [errorMessage]);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#5856d6'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginStyle.formContainer}>
          {/* Keyboard avoid */}
          <WhiteLogo />
          <Text style={loginStyle.title}>Registro</Text>
          <Text style={loginStyle.label}>Nombre</Text>
          <TextInput
            placeholder="Ingrese su nombre"
            placeholderTextColor="rgba(255,255,255,0.4)"
            selectionColor="#fff"
            autoCapitalize="words"
            autoCorrect={false}
            value={name}
            onChangeText={value => onChange(value, 'name')}
            style={loginStyle.inputField}
          />
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
              onPress={onRegister}>
              <Text style={loginStyle.buttonText}>Registrar</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={loginStyle.buttonReturn}
            activeOpacity={0.8}
            onPress={() => navigation.replace('Login')}>
            <Text style={loginStyle.buttonText}>Ir a login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;
