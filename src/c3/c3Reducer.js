const initialState = {
  owner: {
    firstname: 'x',
    lastname: 'x',
  },
  postalAddress: {
    street: 'x',
    state: 'Hawaii',
    county: 'x',
    zip: '1'
  },
  property: null,
  propertyConfirmation: false,
  description: '',
  ownerNameMismatch: false,
  ppt: 0,
  carbon: {
    total: 0,
    aboveGround: 0,
    belowGround: 0,
  },
  sumbitted: false
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
      case 'C3_ABOVE_GROUND_CARBON_UPDATED':
        return { ...state,
          carbon: {
            ...state.carbon,
            total: state.carbon.belowGround + action.payload,
            aboveGround: action.payload
          }
        }
      case 'C3_BELOW_GROUND_CARBON_UPDATED':
        return { ...state,
          carbon: {
            ...state.carbon,
            total: state.carbon.aboveGround + action.payload,
            belowGround: action.payload
          }
        }
      case 'C3_ELU_DESCRIPTION_UPDATED':
        return { ...state,
          description: action.payload
        }
      case 'C3_OWNER_NAME_MISMATCH_UPDATED':
        return { ...state,
          ownerNameMismatch: action.payload
        }
      case 'C3_PRICE_PER_TON_UPDATED':
        return { ...state,
          ppt: action.payload
        }
    default:
      return state
  }
}

export default c3Reducer
