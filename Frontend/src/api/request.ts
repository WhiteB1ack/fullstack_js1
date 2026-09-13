import axios from "axios";

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if(token){
    config.headers.token = token
  }

  return config
})

export default request