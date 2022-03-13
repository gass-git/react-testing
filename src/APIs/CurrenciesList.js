import axios from 'axios'

const API_URL = 'https://free.currconv.com/api/v7/currencies?apiKey=fd1e9ff2cce8aade36fd'

function logCurrenciesList() {
  axios.get(API_URL).then((resp) => { console.log(resp.data.results) })
}

async function getCurrenciesList() {
  try {
    const resp = await axios.get(API_URL)
    return resp.data.results
  }
  catch (error) {
    return error
  }
}

export { logCurrenciesList, getCurrenciesList }