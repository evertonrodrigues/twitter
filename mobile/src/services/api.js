import axios from 'axios';

//192.168.25.255
//127.0.0.1
//192.168.25.135
//172.18.255.255

const api = axios.create({
    baseURL: 'http://192.168.25.135:3001'
})

export default api;