import { uport } from '../util/connectors'

uport.loadState()
const initialState = {
  //see if address field is set, if not, set data to null so that UI & auth know to act as if user is logged out
  //any other key of the uport.state that is unset by uport.logout() would work as well, address just seemed like a good one
  data: (uport.state.name ? uport.state : null)
}

const userReducer = (state = initialState, action) => {
  if (action.type === 'USER_LOGGED_IN')
  {
    return Object.assign({}, state, {
      data: action.payload
    })
  }

  if (action.type === 'USER_LOGGED_OUT')
  {
    return Object.assign({}, state, {
      data: null
    })
  }

  return state
}

export default userReducer
