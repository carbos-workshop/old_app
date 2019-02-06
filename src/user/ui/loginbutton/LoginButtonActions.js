import { uport } from './../../../util/connectors.js'
import { browserHistory } from 'react-router'

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export function loginUser() {
  return function(dispatch) {

    uport.requestDisclosure({
      requested: ['name', 'country', 'image' ],
      // notifications: true,
      network_id: '0x4',
      accountType: 'keypair'
    })

    uport.onResponse('disclosureReq').then(res => {
      console.log(res);
      dispatch(userLoggedIn(res.payload))

      // Used a manual redirect here as opposed to a wrapper.
      // This way, once logged in a user can still access the home page.
      var currentLocation = browserHistory.getCurrentLocation()

      if ('redirect' in currentLocation.query)
      {
        return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
      }

      return browserHistory.push('/dashboard')
    })
  }
}
