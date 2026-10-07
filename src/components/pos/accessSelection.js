export function getLocationId(location) {
  if (!location) return ''
  return String(location._id || location)
}

export function findLocationById(locations = [], locationId) {
  return locations.find(location => getLocationId(location) === String(locationId)) || null
}

export function getAvailableLocationId(locations = [], location) {
  const locationId = getLocationId(location)
  const availableLocation = locationId && findLocationById(locations, locationId)
  return availableLocation && availableLocation.tipo === 'SUCURSAL' ? locationId : ''
}
