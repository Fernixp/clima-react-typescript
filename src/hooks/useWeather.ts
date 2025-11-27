import type { SearchType } from "../types";
import axios from "axios";

export default function useWeather() {
    /* usamos dotenv */
    const api_key = import.meta.env.VITE_API_KEY;
    const fetchWeather = async (search: SearchType) => {
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${api_key}`;
            const {data} = await axios(geoUrl);
            const lat = data[0].lat;
            const lon = data[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
            
            const {data: weatherData} = await axios(weatherUrl);
            console.log(weatherData);
        } catch (error) {
            console.log('Error al obtener el clima: ' + error);
        }
    }
    return {
        fetchWeather
    }
}