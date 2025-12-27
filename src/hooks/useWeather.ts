import type { SearchType } from "../types";
import axios from "axios";
import { useMemo, useState } from "react";
import { z } from "zod";

/* Usando Zod para validar la respuesta de la API del clima */
const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_min: z.number(),
        temp_max: z.number(),
    })
})

export type WeatherType = z.infer<typeof Weather>

export default function useWeather() {

    const [weather, setWeather] = useState<WeatherType>({
        name: '',
        main: {
            temp: 0,
            temp_min: 0,
            temp_max: 0,
        }
    });
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
            //Zod
            const result = Weather.safeParse(weatherData);
            if (result.success) {
                setWeather(result.data);
            } else {
                console.log('respuesta mal formada');
            }
        } catch (error) {
            console.log('Error al obtener el clima: ' + error);
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather.name]);

    return {
        weather,
        fetchWeather,
        hasWeatherData
    }
}