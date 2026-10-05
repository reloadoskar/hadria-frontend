import { mergeById } from './pagination'

test('concatena páginas sin duplicar registros', () => {
  const current = [{ _id: '1', value: 'anterior' }, { _id: '2' }]
  const next = [{ _id: '1', value: 'nuevo' }, { _id: '3' }]

  expect(mergeById(current, next)).toEqual([
    { _id: '1', value: 'nuevo' },
    { _id: '2' },
    { _id: '3' }
  ])
})
