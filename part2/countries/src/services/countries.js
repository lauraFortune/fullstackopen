import axios from 'axios'
const api_url = 'https://restcountries.com/v3.1/all'

const getAllCountries = () => {
    const request = axios.get(api_url)
    return request.then(response => response.data)
}


export default { getAllCountries }

