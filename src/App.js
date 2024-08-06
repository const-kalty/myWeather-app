import { useEffect, useState } from "react";
import Inputs from "./components/Inputs";
import Temp from "./components/Temp";
import TimeAndLocation from "./components/TimeAndLocation";
import UpperBtns from "./components/UpperBtns";
import WeatherForcast from "./components/WeatherForcast";
import getFormattedWeatherData from "./components/WeatherService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [query, setQuery] = useState({ q: "London" });
  const [units, setUnits] = useState("metrics");
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = async () => {
    const cityName = query.q ? query.q  : "curent location";
    toast.info(`Getting weather data for ${cityName.toUpperCase()} `)
    await getFormattedWeatherData({ ...query, units }).then((data) => {
      toast.success(`Weather data for ${cityName.toUpperCase()} received successfully`)
      setWeatherData(data);
      console.log(data);
      
    });
  };
  useEffect(() => {
    getWeather();
  }, [query, units]);

 const dynamicBackgroundColor = ()=>{
  if (!weatherData) return "from-cyan-600 to-blue-700"
  const threshold = units === 'metrics' ? 20:60
  if(weatherData.temp <= threshold) return "from-cyan-600 to-blue-700"
  return "from-yellow-600 to-orange-700"
 }

  return (
    <div className={`md:mx-auto max-w-screen-md md:mt-4 py-5 px-[5%] bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${dynamicBackgroundColor()}`}>
      <UpperBtns setQuery = {setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />

      {weatherData && (
        <>
          <TimeAndLocation weather = {weatherData} />
          <Temp weather={weatherData} units={units} />
          <WeatherForcast title="3 hour step forecast" data={weatherData.hourly} />
          <WeatherForcast title ="daily forecast" data={weatherData.daily} />
        </>
      )}
      <ToastContainer autoClose= {2500} hideProgressBar={true} theme="colored"/>
    </div>
  );
};

export default App;
