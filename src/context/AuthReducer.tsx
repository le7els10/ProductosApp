import {Usuario} from '../interfaces/appInterfaces';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'non-authenticated';
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
}

type AuthAction =
  | {type: 'signUp'; payload: {token: string; user: Usuario}}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'nonAuthenticated'}
  | {type: 'logOut'};

export const AuthReducer = (
  state: AuthState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        user: null,
        status: 'non-authenticated',
        token: null,
        errorMessage: action.payload,
      };
      break;

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };
      break;

    case 'signUp':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user,
      };
      break;
    case 'nonAuthenticated':
    case 'logOut':
      return {
        ...state,
        status: 'non-authenticated',
        token: null,
        user: null,
      };
      break;
    default:
      return state;
      break;
  }
};
