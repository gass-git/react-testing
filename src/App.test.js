import { exchangeRateServer } from "./testServers/exchangeRateServer"
import App from "./App"
import { screen, render } from "@testing-library/react"
import { rest } from 'msw'

xit('should return specific text', async () => {
  const { findByText } = render(<App />)
  const element = await findByText('Exchange rate from USD to HUF: 350')
  expect(element).toBeInTheDocument()
})

test('handle errors', async () => {
  exchangeRateServer.use(
    rest.get('https://free.currconv.com/api/v7/convert', (req, resp, ctx) => {
      return resp(ctx.status(404))
    })
  )

  const { findByText } = render(<App />)
  const element = await findByText(/loading..../i)
  expect(element).toBeInTheDocument
})
