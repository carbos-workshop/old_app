import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import c3Reducer from './c3/c3Reducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  c3: c3Reducer,
})

export default reducer
