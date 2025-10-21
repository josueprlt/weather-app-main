import getWeatherCode from "../utils/getWeatherCode";

export default async function fetchDailyMeteo() {
    let weatherData;
    try {
        const params = {
            latitude: 48.8534,
            longitude: 2.3488,
            daily: ["temperature_2m_min", "temperature_2m_max", "weather_code"],
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
    }
}