import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({capital}) => {

    // STATE VARIABLES
    const [imageUrl, setImageUrl] = useState('')
    const [temp, setTemp] = useState('')
    const [windSpeed, setWindSpeed] = useState('')

    // GET Weather by city function
    const fetchWeather = () => {
    weatherService
    .getWeatherByCity(capital)
    .then(weatherData => {
        setImageUrl(`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`)
        setTemp(weatherData.main.temp)
        setWindSpeed(weatherData.wind.speed)
    })
    .catch((err) => {
        console.log(`Error message: ${err.message}`)
    })
    }
    
    useEffect(fetchWeather, [capital])

    return(
            <>
                <h1>Weather in {capital}</h1>
                <p>tempterature {temp} Celcius</p>
                <img src={imageUrl} alt ="image" width="150" height="150" />
                <p>wind {windSpeed} m/s</p>
            </>
    )
}


export default Weather




