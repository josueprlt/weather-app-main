import getWeatherCode from "../utils/getWeatherCode";

export default async function fetchWeatherCard() {
    let weatherData;
    let latitude = 47.6569; // Default value
    let longitude = -2.762; // Default value

    const location = localStorage.getItem("Location");
    if (location !== null) {
        const coords = JSON.parse(location);
        latitude = coords.latitude;
        longitude = coords.longitude;
    }

    try {
        const params = {
            latitude: latitude,
            longitude: longitude,
            current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "wind_speed_10m", "precipitation", "weather_code"],
            timezone: "auto"
        };

        const query = new URLSearchParams();
        for (const key in params) {
            const value = params[key];
            if (Array.isArray(value)) {
                query.append(key, value.join(","));
            } else {
                query.append(key, value);
            }
        }

        const url = `https://api.open-meteo.com/v1/forecast?${query.toString()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Erreur de récupération météo");

        const data = await res.json();

        weatherData = {
            timezone: data.timezone,
            current: {
                time: data.current.time,
                weather_code: getWeatherCode([data.current.weather_code]),
                temperature_2m: data.current.temperature_2m,
                relative_humidity_2m: data.current.relative_humidity_2m,
                apparent_temperature: data.current.apparent_temperature,
                wind_speed_10m: data.current.wind_speed_10m,
                precipitation: data.current.precipitation,
            },
        };

        return weatherData;

    } catch (err) {
        console.log(err.message);
        return {error: err.message, data: null, loading: false};
    }
}