import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/product'

const productService = {
    getAll: function() {
        return axios.get(`${baseUrl}/all`, {
            withCredentials: true
        })
        .catch((error) => {
            console.error(error)
        })
    },
    getOne: function(id) {
        return axios.get(`${baseUrl}/details/${id}`, {
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
    },
    edit: function(data) {
        return axios.put(`${baseUrl}/edit/${data._id}`, data, {
            withCredentials: true
        })
        .catch((error) => {
            console.error(error)
        })
    }
}

export default productService