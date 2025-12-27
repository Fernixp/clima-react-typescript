import styles from "./App.module.css";
import Form from "./components/Form/Form";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import Spinner from "./components/Spinner/Spinner";
import useWeather from "./hooks/useWeather";

function App() {
  const { weather, fetchWeather, hasWeatherData, loading } = useWeather();
  return (
    <>
      <h1 className={styles.title}>Buscador de clima</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {loading ? (
          <Spinner />
        ) : hasWeatherData ? (
          <WeatherDetail weather={weather} />
        ) : (
          <p>Ingrese datos de la ciudad para ver el clima</p>
        )}
      </div>
    </>
  );
}

export default App;
