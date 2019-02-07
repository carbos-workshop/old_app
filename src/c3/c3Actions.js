export const C3_OWNER_FIRSTNAME_UPDATED = 'C3_OWNER_FIRSTNAME_UPDATED'
export const C3_OWNER_LASTNAME_UPDATED = 'C3_OWNER_LASTNAME_UPDATED'
export const C3_OWNER_ADDRESS_UPDATED = 'C3_OWNER_ADDRESS_UPDATED'
export const C3_POSTAL_ADDRESS_STREET_UPDATED = 'C3_POSTAL_ADDRESS_STREET_UPDATED'
export const C3_POSTAL_ADDRESS_COUNTY_UPDATED = 'C3_POSTAL_ADDRESS_COUNTY_UPDATED'
export const C3_POSTAL_ADDRESS_ZIP_UPDATED = 'C3_POSTAL_ADDRESS_ZIP_UPDATED'
export const C3_POSTAL_ADDRESS_STATE_UPDATED = 'C3_POSTAL_ADDRESS_STATE_UPDATED'
export const C3_PROPERTY_UPDATED = 'C3_PROPERTY_UPDATED'
export const C3_PROPERTY_CONFIRMATION_UPDATED = 'C3_PROPERTY_CONFIRMATION_UPDATED'
export const C3_ELU_DESCRIPTION_UPDATED = 'C3_ELU_DESCRIPTION_UPDATED'
export const C3_ABOVE_GROUND_CARBON_UPDATED = 'C3_ABOVE_GROUND_CARBON_UPDATED'
export const C3_BELOW_GROUND_CARBON_UPDATED = 'C3_BELOW_GROUND_CARBON_UPDATED'
export const C3_OWNER_NAME_MISMATCH_UPDATED = 'C3_OWNER_NAME_MISMATCH_UPDATED'
export const C3_PRICE_PER_TON_UPDATED = 'C3_PRICE_PER_TON_UPDATED'
export const C3_API_ERROR_ENCOUNTERED = 'C3_API_ERROR_ENCOUNTERED'




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

function C3OwnerAddressUpdated(address) {
  return {
    type: C3_OWNER_ADDRESS_UPDATED,
    payload: address
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

function C3PropertyUpdated(property) {
  return {
    type: C3_PROPERTY_UPDATED,
    payload: property
  }
}

function C3PropertyConfirmationUpdated(status) {
  return {
    type: C3_PROPERTY_CONFIRMATION_UPDATED,
    payload: status
  }
}

function C3AboveGroundCarbonUpdated(carbon) {
  return {
    type: C3_ABOVE_GROUND_CARBON_UPDATED,
    payload: carbon
  }
}

function C3BelowGroundCarbonUpdated(carbon) {
  return {
    type: C3_BELOW_GROUND_CARBON_UPDATED,
    payload: carbon
  }
}

function C3ELUDescriptionUpdated(elu) {
  return {
    type: C3_ELU_DESCRIPTION_UPDATED,
    payload: elu
  }
}

function C3OwnerNameMismatchpdated(status) {
  return {
    type: C3_OWNER_NAME_MISMATCH_UPDATED,
    payload: status
  }
}

function C3PricePerTonUpdated(ppt) {
  return {
    type: C3_PRICE_PER_TON_UPDATED,
    payload: ppt
  }
}

function C3ApiErrorEncountered(status) {
  return {
    type: C3_API_ERROR_ENCOUNTERED,
    payload: status
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

export function updateC3OwnerAddress(address) {
  return function(dispatch) {
    dispatch(C3OwnerAddressUpdated(address))
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

export function updateC3Property(property) {
  return function(dispatch) {
    dispatch(C3PropertyUpdated(property))
  }
}

export function updateC3PropertyConfirmation(status) {
  return function(dispatch) {
    dispatch(C3PropertyConfirmationUpdated(status))
  }
}

export function updateC3AboveGroundCarbon(carbon) {
  return function(dispatch) {
    dispatch(C3AboveGroundCarbonUpdated(carbon))
  }
}

export function updateC3BelowGroundCarbon(carbon) {
  return function(dispatch) {
    dispatch(C3BelowGroundCarbonUpdated(carbon))
  }
}

export function updateC3ELUDescription(elu) {
  return function(dispatch) {
    dispatch(C3ELUDescriptionUpdated(elu))
  }
}

export function updateC3OwnerNameMismatch(status) {
  return function(dispatch) {
    dispatch(C3OwnerNameMismatchpdated(status))
  }
}

export function updateC3PricePerTon(ppt) {
  return function(dispatch) {
    dispatch(C3PricePerTonUpdated(ppt))
  }
}

export function encounteredC3ApiError(status) {
  return function(dispatch) {
    dispatch(C3ApiErrorEncountered(status))
  }
}
