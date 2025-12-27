export const formatTemperature = (temp: number): number => {
    /* Convertir de Kelvin a Celsius */
    const celsius = temp - 273.15;
    return Math.round(celsius);
};