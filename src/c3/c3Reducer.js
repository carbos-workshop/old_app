const initialState = {
  owner: {
    firstname: 'default',
    lastname: 'default',
  },
  postalAddress: {
    street: 'xxxx default street',
    state: 'Hawaii',
    county: 'default',
    zip: '88888'
  },
  property: null,
  propertyConfirmation: false,
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
      case 'C3_PROPERTY_UPDATED':
        return { ...state,
          property: action.payload
        }
      case 'C3_PROPERTY_CONFIRMATION_UPDATED':
        return { ...state,
          propertyConfirmation: action.payload
        }
    default:
      return state
  }
}

export default c3Reducer
