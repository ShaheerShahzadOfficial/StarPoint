import {
  FORGOT_PASSWORD_EMAIL,
  FORGOT_PASSWORD_EMAIL_FAIL,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
  LOGOUT_USER_FAIL,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  RESET_PASSWORD_EMAIL,
  RESET_PASSWORD_EMAIL_REQUEST,
  RESET_PASSWORD_EMAIL_FAIL,
  LOAD_USER_FAIL,
  LOAD_USER,
  FORGOT_PASSWORD_EMAIL_REQUEST,
  LOAD_USER_REQUEST,
  FORGOT_PASSWORD_EMAIL_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_FAIL,
  RESET_PASSWORD_EMAIL_RESET,
  UPDATE_PASSWORD_RESET,
} from '../Constant'

const initialState = {
  user: null,
  error: [],
  message: {},
}

export default function AuthReducer(state = initialState, actions) {
  switch (actions.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case LOAD_USER_REQUEST:
    case FORGOT_PASSWORD_EMAIL_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case RESET_PASSWORD_EMAIL_REQUEST:
      return {
        loading: true,
      }

    case LOGIN_USER:
    case REGISTER_USER:
    case LOAD_USER:
      return {
        loading: false,
        isAuthenticated: true,
        user: actions.payload,
      }

    case LOGOUT_USER:
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
      }

    case REGISTER_USER_FAIL:
    case LOGIN_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: actions.payload,
      }

    case LOAD_USER_FAIL:
      return {
        isAuthenticated: false,
        loading: false,
        user: null,
        error: actions.payload,
      }

    case LOGOUT_USER_FAIL:
      return {
        error: actions.payload,
        loading: false,
      }

    case FORGOT_PASSWORD_EMAIL:
      return {
        loading:false,
        message: actions.payload,
      }

    case FORGOT_PASSWORD_EMAIL_FAIL:
      return {
        loading:false,
        error: actions.payload,
      }

    case FORGOT_PASSWORD_EMAIL_RESET:
      return {
        message: false,
      }
    case UPDATE_PASSWORD:
      return {
        loading: false,
        isAuthenticated: true,
        isUpdated: actions.payload,
      }
      case RESET_PASSWORD_EMAIL:
        return {
          loading: false,
          isUpdated: actions.payload,
        }

    case UPDATE_PASSWORD_FAIL:
    case RESET_PASSWORD_EMAIL_FAIL:
      return {
        loading: false,
        error: actions.payload,
      }

    case UPDATE_PASSWORD_RESET:
    case RESET_PASSWORD_EMAIL_RESET:
      return {
        loading: false,
        isUpdated: false,
        error: null,

      }

    default:
      return state
  }
}


