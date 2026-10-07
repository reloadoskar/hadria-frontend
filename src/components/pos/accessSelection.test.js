import { describe, expect, it } from 'vitest'
import { findLocationById, getAvailableLocationId, getLocationId } from './accessSelection'

describe('POS access location selection', () => {
  it('uses an empty controlled value until a location is available', () => {
    expect(getLocationId(null)).toBe('')
    expect(getLocationId(undefined)).toBe('')
  })

  it('uses stable ids instead of object identity in the select', () => {
    expect(getLocationId({ _id: 'location-1', nombre: 'Bodega' })).toBe('location-1')
    expect(getLocationId('location-2')).toBe('location-2')
  })

  it('keeps the select empty until the selected location exists in its options', () => {
    const selected = { _id: 'location-1', nombre: 'Bodega', tipo: 'SUCURSAL' }

    expect(getAvailableLocationId([], selected)).toBe('')
    expect(getAvailableLocationId([{ _id: 'location-2', tipo: 'SUCURSAL' }], selected)).toBe('')
    expect(getAvailableLocationId([selected], selected)).toBe('location-1')
  })

  it('rejects locations that exist but are not selectable branches', () => {
    const warehouse = { _id: 'location-1', nombre: 'Bodega', tipo: 'BODEGA' }

    expect(getAvailableLocationId([warehouse], warehouse)).toBe('')
  })

  it('returns the current location object selected by id', () => {
    const locations = [
      { _id: 'location-1', nombre: 'Bodega' },
      { _id: 'location-2', nombre: 'Sucursal' }
    ]

    expect(findLocationById(locations, 'location-2')).toBe(locations[1])
    expect(findLocationById(locations, 'missing')).toBeNull()
  })
})
