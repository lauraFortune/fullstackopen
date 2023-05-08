import axios from 'axios'

// parameters
const api_key = process.env.REACT_APP_WEATHER_API_KEY

const getWeatherByCity = (city) => {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
    const request = axios.get(API_URL)
    return request.then(response => response.data)
}


export default { getWeatherByCity }



