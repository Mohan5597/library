import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/user'
import bookReducer from '../reducers/book'


const configureStore=() =>{
    const store=createStore(combineReducers({
        user:userReducer,
        books:bookReducer
    }),applyMiddleware(thunk))
    return store
}
export default configureStore