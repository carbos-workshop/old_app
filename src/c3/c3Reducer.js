const initialState = {
  owner: {
    firstname: '',
    lastname: '',
  },
  postalAddress: ''
}

function c3Reducer(state = initialState, action) {
  switch(action.type){
    case 'C3_OWNER_FIRSTNAME_UPDATED':
      return { ...state,
        owner: {
          ...state.owner,
          firstname: action.payload
        }
      }
    case 'C3_OWNER_LASTNAME_UPDATED':
      return { ...state,
        owner: {
          ...state.owner,
          lastname: action.payload
        }
      }
    case 'C3_POSTAL_ADDRESS_UPDATED':
      return { ...state,
        postalAddress: action.payload
      }
    default:
      return state
  }
}

export default c3Reducer
