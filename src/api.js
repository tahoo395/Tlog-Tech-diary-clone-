import axios from 'axios'

export default() => {
    return axios.create({
      baseURL: `https://za011b128-z699745d2-gtw.qovery.io`,
      withCredentials : true,
      headers : {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials": true,
      }
    })
  }