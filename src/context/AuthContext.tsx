import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext} from 'react';
import {useEffect} from 'react';
import {useReducer} from 'react';
import cafeApi from '../api/CafeApi';
import {
  LoginData,
  LoginResponse,
  RegisterData,
  Usuario,
} from '../interfaces/appInterfaces';
import {AuthReducer, AuthState} from './AuthReducer';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'non-authenticated';
  singUp: (data: RegisterData) => void;
  singIn: (data: LoginData) => void;
  logOut: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(AuthReducer, authInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    let token = await AsyncStorage.getItem('token');

    //no token
    if (!token) return dispatch({type: 'nonAuthenticated'});

    const resp = await cafeApi.get('/auth');

    if (resp.status !== 200) {
      return dispatch({type: 'nonAuthenticated'});
    }

    //validar token
    dispatch({
      type: 'signUp',
      payload: {
        token: resp.data.token,
        user: resp.data.usuario,
      },
    });
  };

  //registro
  const singUp = async ({nombre, correo, password}: RegisterData) => {
    try {
      const {data} = await cafeApi.post<LoginResponse>('/usuarios', {
        correo,
        password,
        nombre,
      });

      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario,
        },
      });

      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'info incorrecta',
      });
    }
  };
  const singIn = async ({correo, password}: LoginData) => {
    try {
      const {data} = await cafeApi.post<LoginResponse>('/auth/login', {
        correo,
        password,
      });

      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario,
        },
      });

      await AsyncStorage.setItem('token', data.token);
    } catch (error) {
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'info incorrecta',
      });
    }
  };
  const logOut = async () => {
    await AsyncStorage.removeItem('token');

    dispatch({
      type: 'logOut',
    });
  };
  const removeError = () => {
    dispatch({
      type: 'removeError',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        singUp,
        singIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
