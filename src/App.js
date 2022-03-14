import React, { useEffect, useState, useCallback } from 'react'
import { logExchangeRate, getExchangeRate } from './APIs/ExchangeRate'
import { logCurrenciesList } from './APIs/CurrenciesList'

export default function App() {
  const [exchangeRate, setExchangeRate] = useState()
  const fromCurrency = 'USD'
  const toCurrency = 'HUF'
  const [fetchError, setFetchError] = useState(false)

  const fetchData = useCallback(async () => {
    let rate = await getExchangeRate('USD', 'HUF')
    console.log(rate)
    setExchangeRate(rate)
  }, [])

  useEffect(() => {
    fetchData().catch(console.error)
  }, [fetchData])

  if (!exchangeRate) return <div>loading....</div>

  return (
    <div>
      Exchange rate from {fromCurrency} to {toCurrency}: {exchangeRate}
    </div>
  )
}


