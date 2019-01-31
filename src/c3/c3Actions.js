export const C3_OWNER_FIRSTNAME_UPDATED = 'C3_OWNER_FIRSTNAME_UPDATED'
export const C3_OWNER_LASTNAME_UPDATED = 'C3_OWNER_LASTNAME_UPDATED'
export const C3_POSTAL_ADDRESS_STREET_UPDATED = 'C3_POSTAL_ADDRESS_STREET_UPDATED'
export const C3_POSTAL_ADDRESS_COUNTY_UPDATED = 'C3_POSTAL_ADDRESS_COUNTY_UPDATED'
export const C3_POSTAL_ADDRESS_ZIP_UPDATED = 'C3_POSTAL_ADDRESS_ZIP_UPDATED'
export const C3_POSTAL_ADDRESS_STATE_UPDATED = 'C3_POSTAL_ADDRESS_STATE_UPDATED'


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

function C3PostalAddressStreetUpdated(address) {
  return {
    type: C3_POSTAL_ADDRESS_STREET_UPDATED,
    payload: address
  }
}

function C3PostalAddressCountyUpdated(county) {
  return {
    type: C3_POSTAL_ADDRESS_COUNTY_UPDATED,
    payload: county
  }
}

function C3PostalAddressZipUpdated(zip) {
  return {
    type: C3_POSTAL_ADDRESS_ZIP_UPDATED,
    payload: zip
  }
}

function C3PostalAddressStateUpdated(state) {
  return {
    type: C3_POSTAL_ADDRESS_STATE_UPDATED,
    payload: state
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

export function updateC3PostalAddressStreet(address) {
  return function(dispatch) {
    dispatch(C3PostalAddressStreetUpdated(address))
  }
}

export function updateC3PostalAddressCounty(county) {
  return function(dispatch) {
    dispatch(C3PostalAddressCountyUpdated(county))
  }
}

export function updateC3PostalAddressZip(zip) {
  return function(dispatch) {
    dispatch(C3PostalAddressZipUpdated(zip))
  }
}

export function updateC3PostalAddressState(state) {
  return function(dispatch) {
    dispatch(C3PostalAddressStateUpdated(state))
  }
}
