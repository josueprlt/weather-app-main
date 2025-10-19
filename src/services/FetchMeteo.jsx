export default async function fetchMeteo() {
    try {
        const params = {
            latitude: 48.8534,
            longitude: 2.3488,
            hourly: ["temperature_2m", "snowfall", "showers", "rain", "precipitation"],
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
        const weatherData = {
            latitude: data.latitude,
            longitude: data.longitude,
            elevation: data.elevation,
            timezone: data.timezone,
            hourly: {
                time: data.hourly.time.map((t) => new Date(t)),
                temperature_2m: data.hourly.temperature_2m,
                snowfall: data.hourly.snowfall,
                showers: data.hourly.showers,
                rain: data.hourly.rain,
                precipitation: data.hourly.precipitation,
            },
        };

        console.log(weatherData);
    } catch (err) {
        console.log(err.message);
    }
}