import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL:"https://chat-app-backend-0kzn.onrender.com/api",  
    withCredentials:true // send cookies
})