import axios from 'axios'

const apiClient = axios.create({
  timeout: 10000, // 10-second timeout
})

export default apiClient
