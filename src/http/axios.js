import axios from 'axios'
// import qs from 'qs'
import conf from './config.js'
// let token = conf.getCookie('Token');
axios.defaults.baseURL = 'http://192.168.50.50:10000'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.common['Authorization'] = conf.getCookie('Token')
// axios.interceptors.request.use((config) => {
//   if (config.method === 'post') {
//     config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
//   }
//   return config
// })
export default axios
