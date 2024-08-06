import { DateTime } from "luxon";

const API_KEY = "0389ce5d0aaf1f38eaeabff5907c835a"
const BASE_URL = "https://api.openweathermap.org/data/2.5/"

const fetchWeatherData = (infoType, city) => {
    const url = new URL(BASE_URL + infoType)
    url.search = new URLSearchParams({ ...city, appid: API_KEY });

    return fetch(url)
        .then((res) => res.json())
};

const iconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);



const formattedData = (data) => {

    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name, dt, sys: { country, sunrise, sunset }, weather, wind: { speed }, timezone } = data;

    const { main: details, icon } = weather[0]
    const formattedLocalTime = formatToLocalTime(dt, timezone);

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        timezone,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        speed,
        details,
        icon: iconUrl(icon),
        formattedLocalTime
    };
}

const weatherForcast = (secs,offset,data)=>{
    const hourly = data
    .filter((f) => f.dt > secs)
    .slice(0,5)
    .map((f) =>({
        temp:f.main.temp,
        title:formatToLocalTime(f.dt,offset, "h a"),
        icon: iconUrl(f.weather[0].icon),
        date:f.dt_txt

    }))
const daily  = data.filter((f) => f.dt_txt.slice(-8) === "00:00:00").map((f) =>({
    temp:f.main.temp,
    title:formatToLocalTime(f.dt,offset, "ccc"),
    icon: iconUrl(f.weather[0].icon),
    date:f.dt_txt

}))

    return {hourly,daily};
}

const getFormattedWeatherData = async (city) => {
    const getFormattedWeather = await fetchWeatherData("weather", city)
        .then(formattedData)
        const {dt,lat,lon,timezone}  = getFormattedWeather
        const getForecast = await fetchWeatherData("forecast", { lat, lon, units:city.units })
        .then((d)=>weatherForcast(dt,timezone,d.list) )
    return { ...getFormattedWeather, ...getForecast}
}

export default getFormattedWeatherData;