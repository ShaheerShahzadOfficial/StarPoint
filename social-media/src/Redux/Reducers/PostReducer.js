import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
} from '../Constant'

const initialState = {
  post: [],
  error: [],
  message: {},
}

export default function AuthReducer(state = initialState, actions) {
  switch (actions.type) {
    case CREATE_POST_REQUEST:
    case UPDATE_POST_REQUEST:
    case DELETE_POST_REQUEST:
      return {
        loading: true,
      }

      case CREATE_POST_SUCCESS:
        return{
            loading:false,
            success:false
        }
        case UPDATE_POST_SUCCESS:
            return{
                loading:false,
                isUpdated:true
            }
            case DELETE_POST_SUCCESS:
                return{
                    loading:false,
                    isDeleted:true
                }

    default:
      return state
  }
}
