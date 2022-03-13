import axios from "axios";

function logExchangeRate(from, to) {
  const API_URL_2 = `https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=fd1e9ff2cce8aade36fd`

  axios.get(API_URL_2).then((resp) => {

    const rateValue = () => {
      let [dataObj, propNamesArr] = [resp.data, Object.keys(resp.data)]
      return dataObj[propNamesArr[0]]
    }
    console.log('-----------------')
    console.log('Response:')
    console.log(resp)
    console.log('-----------------')
    console.log('Data object:')
    console.log(resp.data)
    console.log('-----------------')
    console.log('Exchange rate: ')
    console.log(console.log(rateValue()))
  })
}

async function getExchangeRate(from, to) {
  const API_URL_2 = `https://free.currconv.com/api/v7/convert?q=${from}_${to}&compact=ultra&apiKey=fd1e9ff2cce8aade36fd`

  try {
    const resp = await axios.get(API_URL_2)
    const dataObj = resp.data
    const propNamesArr = Object.keys(dataObj)
    return dataObj[propNamesArr[0]]
  }
  catch (error) {
    return error
  }
}

export { logExchangeRate, getExchangeRate }

