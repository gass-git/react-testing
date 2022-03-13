import { getExchangeRate } from './APIs/ExchangeRate'
import { exchangeRateServer } from './testServers/exchangeRateServer'

// TEST BLOCK
describe('getExchangeRate fetch', () => {

  it('should return data', async () => {
    const exchangeRate = await getExchangeRate('USD', 'HUF')
    expect(exchangeRate).toBeTruthy()
  })

  it('should not return null', async () => {
    const exchangeRate = await getExchangeRate('USD', 'HUF')
    expect(exchangeRate).not.toBeNull()
  })

  it('should not return undefined', async () => {
    const exchangeRate = await getExchangeRate('USD', 'HUF')
    expect(exchangeRate).not.toBeUndefined()
  })

  it('should return a number bigger then 0', async () => {
    const exchangeRate = await getExchangeRate('USD', 'HUF')
    expect(exchangeRate).toBeGreaterThan(0)
  })

  it('should return a number', async () => {
    const exchangeRate = await getExchangeRate('USD', 'HUF')
    expect(typeof exchangeRate === 'number').toBe(true)
  })
})