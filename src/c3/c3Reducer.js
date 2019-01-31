const initialState = {
  owner: {
    firstname: 'Deborah',
    lastname: 'Carter',
  },
  postalAddress: {
    street: '1950 Lucy Lane',
    state: 'California',
    county: 'Riverside',
    zip: '92879'
  }
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
    case 'C3_POSTAL_ADDRESS_STREET_UPDATED':
      return { ...state,
        postalAddress: {
          ...state.postalAddress,
          street: action.payload
        }
      }
      case 'C3_POSTAL_ADDRESS_STATE_UPDATED':
        return { ...state,
          postalAddress: {
            ...state.postalAddress,
            state: action.payload
          }
        }
      case 'C3_POSTAL_ADDRESS_COUNTY_UPDATED':
        return { ...state,
          postalAddress: {
            ...state.postalAddress,
            county: action.payload
          }
        }
      case 'C3_POSTAL_ADDRESS_ZIP_UPDATED':
        return { ...state,
          postalAddress: {
            ...state.postalAddress,
            zip: action.payload
          }
        }
    default:
      return state
  }
}

export default c3Reducer
