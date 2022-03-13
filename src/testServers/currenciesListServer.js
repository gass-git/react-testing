import { rest } from 'msw'
import { setupServer } from 'msw/node'

const currenciesListServer = setupServer(

  // Requests to mock
  rest.get('https://free.currconv.com/api/v7/currencies', (req, resp, ctx) => {
    return resp(
      ctx.status(200),
      ctx.json({
        results: {
          ALL: { randProp: '', id: 0 },
          XCD: { randProp: '', id: 1 },
          EUR: { randProp: '', id: 2 }
        }
      })
    )
  }), // Fallback request handler (in case the above request is not successful)
  rest.get('*', (req, resp, ctx) => {
    console.error(`please add request handler for ${req.url.toString()}`)
    return resp(
      ctx.status(500),
      ctx.json({ error: 'please add a request handler' })
    )
  })

)

// Establish requests interception layer before all tests
beforeAll(() => { currenciesListServer.listen() })

/**
 * Clean up after all tests are done, preventing this
 * interception layer from affecting irrelevant tests. 
 */
afterAll(() => { currenciesListServer.close() })

afterEach(() => currenciesListServer.resetHandlers())

export { currenciesListServer, rest }