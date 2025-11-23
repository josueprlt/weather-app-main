import getWeatherCode from "../utils/getWeatherCode";

export default async function fetchWeatherCard(latitude = null, longitude = null) {
    let weatherData;
    let defaultLatitude = 47.6569;
    let defaultLongitude = -2.762;
    let defaultTemperature = "celsius";
    let defaultWind = "km/h";
    let defaultPrecipitation = "mm";

    const location = localStorage.getItem("Location");
    if (location !== null) {
        const coords = JSON.parse(location);
        defaultLatitude = coords.latitude;
        defaultLongitude = coords.longitude;
    }

    const preferences = localStorage.getItem("Preferences");
    if (preferences !== null) {
        const prefs = JSON.parse(preferences);
        defaultTemperature = prefs.temperature;
        defaultWind = prefs.wind;
        defaultPrecipitation = prefs.precipitation;
    }

    try {
        const params = {
            latitude: latitude === null ? defaultLatitude : latitude,
            longitude: longitude === null ? defaultLongitude : longitude,
            current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "wind_speed_10m", "precipitation", "weather_code"],
            timezone: "auto",
            temperature_unit: defaultTemperature,
            wind_speed_unit: defaultWind === "km/h" ? "kmh" : defaultWind,
            precipitation_unit: defaultPrecipitation === "in" ? "inch" : defaultPrecipitation
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