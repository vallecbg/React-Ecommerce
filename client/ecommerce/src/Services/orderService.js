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
    }
}

export default orderService