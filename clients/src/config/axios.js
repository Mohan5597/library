import Axios from 'axios'

// 
const axios = Axios.create({
    //'http://localhost:3001' ||
    baseURL:  'http://localhost:3005' ||'/'
})

export default axios