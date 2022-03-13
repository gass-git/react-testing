import { getCurrenciesList } from './APIs/CurrenciesList'

// TEST BLOCK
describe('getExchangeList fetch', () => {

  it('should return an object', async () => {
    const list = await getCurrenciesList()
    expect(typeof list === 'object').toBe(true)
  })

  test('the number of props in the object should be bigger the 0', async () => {
    const list = await getCurrenciesList()
    const numberOfProps = Object.keys(list).length
    expect(numberOfProps).toBeGreaterThan(0)
  })



})