import type { SearchType } from "../types";
import axios from "axios";
import { z } from "zod";

const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_min: z.number(),
        temp_max: z.number(),
    })
})

type WeatherType = z.infer<typeof Weather>

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
            
            console.log(weatherUrl);
            const {data: weatherData} = await axios(weatherUrl);
            //Zod
            const result = Weather.safeParse(weatherData);
            if (result.success) {
                console.log(result.data.name);
                console.log(result.data.main.temp);
                console.log(result.data.main.temp_min);
                console.log(result.data.main.temp_max);
                return;
            }else{
                console.log('respuesta mal formada');
            }
        } catch (error) {
            console.log('Error al obtener el clima: ' + error);
        }
    }
    return {
        fetchWeather
    }
}