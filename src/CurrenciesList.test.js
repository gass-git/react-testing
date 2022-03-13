import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { getCurrenciesList } from './APIs/CurrenciesList'

const server = setupServer(

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
describe('CurrenciesList', () => {

  it('response should never be undefined or null', async () => {
    const resp = await getCurrenciesList()
    expect(resp).not.toBeNull
    expect(resp).not.toBeUndefined
  })

  it('should return an object', async () => {
    const currenciesList = await getCurrenciesList()
    expect(typeof currenciesList === 'object').toBe(true)
  })

  it('should return an object with a list of currencies', async () => {
    const listObject = await getCurrenciesList()
    const numberOfProps = Object.keys(listObject).length
    expect(numberOfProps).toBeGreaterThan(0)
  })

  test('all currencies in the list should have an id', async () => {
    const listObj = await getCurrenciesList()
    const propNamesArr = Object.keys(listObj)
    const listLength = propNamesArr.length

    for (let i = 0; i < listLength; i++) {
      expect(listObj[propNamesArr[i]].id).not.toBeNull
      expect(listObj[propNamesArr[i]].id).not.toBeUndefined
    }
  })

})