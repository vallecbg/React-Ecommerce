import axios from 'axios'
const baseUrl = 'http://localhost:8000/api/order'

const orderService = {
    create: function(data) {
        return axios.post(`${baseUrl}/create`, data, {
            withCredentials: true
        })
        .catch((error) => {
            console.error(error)
        })
    },
    getAll: function() {
        return axios.get(`${baseUrl}/all`, {
            withCredentials: true
        })
        .catch((error) => {
            console.error(error)
        })
    },
    setStatus: function(id, status) {
        console.log("Status: ", status);
        return axios.post(`${baseUrl}/setStatus/${id}`, status, {
            withCredentials: true
        })
        .catch((error) => {
            console.error(error)
        })
    }
}

export default orderService