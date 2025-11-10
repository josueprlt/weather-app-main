import getWeatherCode from "../utils/getWeatherCode.jsx";

export default async function fetchHourlyMeteo(latitude = null, longitude = null) {
    let weatherData;
    let defaultLatitude = 47.6569;
    let defaultLongitude = -2.762;

    const location = localStorage.getItem("Location");
    if (location !== null) {
        const coords = JSON.parse(location);
        defaultLatitude = coords.latitude;
        defaultLongitude = coords.longitude;
    }

    try {
        const params = {
            latitude: latitude === null ? defaultLatitude : latitude,
            longitude: longitude === null ? defaultLongitude : longitude,
            hourly: ["weather_code", "temperature_2m", "dew_point_2m"],
            timezone: "auto"
        };

        // Construire l’URL avec les paramètres
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

        // Simplification de la structure
        weatherData = {
            timezone: data.timezone,
            hourly: {
                time: data.hourly.time,
                weather_code: getWeatherCode(data.hourly.weather_code),
                temperature_2m: data.hourly.temperature_2m,
                dew_point_2m: data.hourly.dew_point_2m,
            },
        };
        return weatherData;

    } catch (err) {
        console.log(err.message);
        return {error: err.message, data: null, loading: false};
    }
}