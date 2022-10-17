import { composeWithDevTools } from '@redux-devtools/extension';
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AuthReducer from './Reducers/AuthReducer';

const rootReducer = combineReducers({
    Auth:AuthReducer
})


const initialState = {

}


const Store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
)


export default Store