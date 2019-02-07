import { browserHistory } from 'react-router'
import { uport } from '../../../util/connectors.js'

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
function userLoggedOut(user) {
  return {
    type: USER_LOGGED_OUT,
    payload: user
  }
}

export function logoutUser() {
  return function(dispatch) {
    // Logout user.
    uport.logout()
    dispatch(userLoggedOut())

    // Redirect home.
    return browserHistory.push('/')
  }
}
