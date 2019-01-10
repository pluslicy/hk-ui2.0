import axios from 'axios'
// import qs from 'qs'
axios.defaults.baseURL = 'http://192.168.50.50:10000'
axios.defaults.headers.post['Content-Type'] = 'application/JSON'
// axios.interceptors.request.use((config) => {
//   if (config.method === 'post') {
//     config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
//   }
//   return config
// })
export default axios
