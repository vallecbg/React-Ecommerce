import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/auth'

const userService = {
    login: function (data) {
        return axios.post(`${baseUrl}/login`, data, {
                withCredentials: true
            })
            .catch((error) => {
                console.error(error)
            })
    },
    register: function (data) {
        return axios.post(`${baseUrl}/register`, data, {
            withCredentials: true
        })
        .catch((error) => {
            console.error(error)
        })
    },
    logout: function() {
        return axios.get(`${baseUrl}/logout`, {
            withCredentials: true
        })
        .catch((error) => {
            console.error(error)
        })
    }
}

export default userService