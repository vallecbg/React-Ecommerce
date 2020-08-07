import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/user'

const userService = {
    getAll: function() {
        return axios.get(`${baseUrl}/all`, {
            withCredentials: true
        })
        .catch((error) => {
            console.error(error)
        })
    },
    details: function(id) {
        return axios.get(`${baseUrl}/details/${id}`, {
            withCredentials: true
        })
        .catch((error) => {
            console.error(error)
        })
    }
}

export default userService