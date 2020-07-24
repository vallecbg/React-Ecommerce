import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/category'

const categoryService = {
    getAll: function() {
        return axios.get(`${baseUrl}/all`, {
            withCredentials: true
        })
        .catch((error) => {
            console.error(error)
        })
    },
    create: function(data) {
        return axios.post(`${baseUrl}/create`, data, {
            withCredentials: true
        })
        .catch((error) => {
            console.error(error)
        })
    }
}

export default categoryService