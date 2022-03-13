import React, { useEffect } from 'react'
import { logExchangeRate } from './APIs/ExchangeRate'
import { logCurrenciesList } from './APIs/CurrenciesList'

function App() {

  useEffect(() => {
    logCurrenciesList()
  }, [])


  return (
    <div>
      something
    </div>
  );
}

export default App;
