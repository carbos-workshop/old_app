export const C3_OWNER_FIRSTNAME_UPDATED = 'C3_OWNER_FIRSTNAME_UPDATED'
export const C3_OWNER_LASTNAME_UPDATED = 'C3_OWNER_LASTNAME_UPDATED'
export const C3_POSTAL_ADDRESS_UPDATED = 'C3_POSTAL_ADDRESS_UPDATED'

function C3OwnerFirstnameUpdated(name) {
  return {
    type: C3_OWNER_FIRSTNAME_UPDATED,
    payload: name
  }
}

function C3OwnerLastnameUpdated(name) {
  return {
    type: C3_OWNER_LASTNAME_UPDATED,
    payload: name
  }
}

function C3PostalAddressUpdated(address) {
  return {
    type: C3_POSTAL_ADDRESS_UPDATED,
    payload: address
  }
}

export function updateC3OwnerFirstname(name) {
  return function(dispatch) {
    dispatch(C3OwnerFirstnameUpdated(name))
  }
}

export function updateC3OwnerLastname(name) {
  return function(dispatch) {
    dispatch(C3OwnerLastnameUpdated(name))
  }
}

export function updateC3PostalAddress(address) {
  return function(dispatch) {
    dispatch(C3PostalAddressUpdated(address))
  }
}
