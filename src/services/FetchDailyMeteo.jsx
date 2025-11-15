import getWeatherCode from "../utils/getWeatherCode";

export default async function fetchDailyMeteo(latitude = null, longitude = null) {
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
            daily: ["temperature_2m_min", "temperature_2m_max", "weather_code"],
            timezone: "auto",
            temperature_unit: defaultTemperature,
            wind_speed_unit: defaultWind === "km/h" ? "kmh" : defaultWind,
            precipitation_unit: defaultPrecipitation === "in" ? "inch" : defaultPrecipitation
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

        weatherData = {
            latitude: data.latitude,
            longitude: data.longitude,
            elevation: data.elevation,
            timezone: data.timezone,
            daily: {
                time: data.daily.time.map((t) => new Date(t).toLocaleDateString("en-US", {weekday: "long"})),
                weather_code: getWeatherCode(data.daily.weather_code),
                temperature_2m_min: data.daily.temperature_2m_min,
                temperature_2m_max: data.daily.temperature_2m_max,
            },
        };
        return weatherData;

    } catch (err) {
        console.log(err.message);
        return {error: err.message, data: null, loading: false};
    }
}