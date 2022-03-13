import { getExchangeRate } from './APIs/ExchangeRate'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(

  // Requests to mock
  rest.get('https://free.currconv.com/api/v7/convert', (req, resp, ctx) => {
    return resp(
      ctx.status(200),
      ctx.json({ USD_HUF: 350.3 })
    )
  })

)

// Establish requests interception layer before all tests
beforeAll(() => {
  server.listen()
})

/**
 * Clean up after all tests are done, preventing this
 * interception layer from affecting irrelevant tests. 
 */
afterAll(() => {
  server.close()
})



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