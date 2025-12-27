import styles from "./App.module.css";
import Form from "./components/Form/Form";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import Spinner from "./components/Spinner/Spinner";
import useWeather from "./hooks/useWeather";
import Alert from "./components/Alert/Alert";

function App() {
  const { weather, fetchWeather, hasWeatherData, loading, notFound } =
    useWeather();
  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {loading ? (
          <Spinner />
        ) : notFound ? (
          <Alert>Ciudad no encontrada</Alert>
        ) : hasWeatherData ? (
          <WeatherDetail weather={weather} />
        ) : (
          <Alert>Ingrese datos de la ciudad para ver el clima</Alert>
        )}
      </div>
    </>
  );
}

export default App;
