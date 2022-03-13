import { rest } from 'msw'
import { setupServer } from 'msw/node'

const exchangeRateServer = setupServer(

  // Requests to mock
  rest.get('https://free.currconv.com/api/v7/convert', (req, resp, ctx) => {
    return resp(
      ctx.status(200),
      ctx.json({ USD_HUF: 350.3 })
    )
  })

)

// Establish requests interception layer before all tests
beforeAll(() => { exchangeRateServer.listen() })

/**
 * Clean up after all tests are done, preventing this
 * interception layer from affecting irrelevant tests. 
 */
afterAll(() => { exchangeRateServer.close() })

afterEach(() => exchangeRateServer.resetHandlers())

export { exchangeRateServer, rest }