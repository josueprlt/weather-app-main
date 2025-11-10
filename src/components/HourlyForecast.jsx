import {useEffect, useState} from "react";
import fetchHourlyMeteo from "../services/FetchHourlyMeteo";
import getDayCode from "../utils/getDayCode";
import getAMPMCode from "../utils/getAMPMCode";
import Skeleton from "react-loading-skeleton";
import Select from "./Select.jsx";

export const HourlyForecast = ({latitude = null, longitude = null, setError}) => {
    const [state, setState] = useState({data: null, loading: true, error: null});
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [realHourlyForecast, setRealHourlyForecast] = useState(null);

    useEffect(() => {
        async function loadWeather() {
            let result;
            setState({data: null, loading: true, error: null})

            if (latitude && longitude) {
                result = await fetchHourlyMeteo(latitude, longitude);
            } else {
                result = await fetchHourlyMeteo();
            }
            if (result.error) setError(result.error);

            setState(result);
        }

        loadWeather();
    }, [latitude, longitude]);

    useEffect(() => {
        if (!state || !state.hourly || !state.hourly.time) return;

        const hourlyData = state.hourly;

        // 1. Transformer les listes d'heures en un tableau d'objets 'heure'
        const allHours = hourlyData.time.map((time, index) => {
            const date = new Date(time);

            return {
                time: time,
                dayName: getDayCode(date.getDay()),
                dayIndex: date.getDay(), // Utile pour le tri
                hour: date.getHours(),
                temperature: hourlyData.temperature_2m[index],
                weather_code: hourlyData.weather_code[index],
                // Ajoutez d'autres champs si nécessaire (dew_point_2m, etc.)
            };
        });

        // 2. Utiliser reduce pour regrouper les objets 'heure' par 'dayName'
        const groupedByDay = allHours.reduce((acc, hourData) => {
            const lastDay = acc[acc.length - 1];

            // Si c'est le premier élément ou si le jour change
            if (!lastDay || lastDay.day !== hourData.dayName) {
                // Créer une nouvelle entrée de jour
                acc.push({
                    day: hourData.dayName,
                    hours: [
                        {
                            hour: hourData.hour,
                            temperature: hourData.temperature,
                            weather_code: hourData.weather_code,
                        }
                    ]
                });
            } else {
                // Ajouter l'heure à la liste du jour existant
                lastDay.hours.push({
                    hour: hourData.hour,
                    temperature: hourData.temperature,
                    weather_code: hourData.weather_code,
                });
            }
            return acc;
        }, []); // 'acc' commence comme un tableau vide

        // 3. Mettre à jour l'état final
        setHourlyForecast(groupedByDay);

    }, [state, latitude, longitude]);

    const handlerChangeDay = (event) => {
        const filterDay = hourlyForecast.filter((day) => day.day === event.target.value);
        setRealHourlyForecast(filterDay[0]);
    }

    if (!(hourlyForecast.length > 0)) return (
        <>
            <div className="flex justify-between items-center pt-4 pb-4 sticky top-0 bg-neutral-800">
                <h4>Hourly Forecast</h4>
                <Select icon="none" color="600">-</Select>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {Array.from({length: 8}).map((_, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center  bg-neutral-700 rounded-lg border border-neutral-600"
                    >
                        <Skeleton
                            containerClassName="w-full h-full"
                            baseColor="#312f4b"
                            highlightColor="#464365"
                            borderRadius="0.5rem"
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "block",     // le span interne
                                lineHeight: "normal", // évite les décalages verticaux
                                borderRadius: "0.5rem",
                            }}
                        />
                    </div>
                ))}
            </div>
        </>
    );
    if (state.error) return <div className="text-red-500">Error: {state.error}</div>;

    return (
        <>
            <div className="flex justify-between items-center pt-4 pb-4 sticky top-0 bg-neutral-800">
                <h4>Hourly Forecast</h4>
                <Select color="600" otherSelect={hourlyForecast.map((day) => day.day)} onchange={handlerChangeDay}/>
            </div>
            <div className="grid grid-cols-1 gap-4 top-0">
                <HourlyForecastCard
                    hours={realHourlyForecast === null ? hourlyForecast[0].hours : realHourlyForecast.hours}/>
            </div>
        </>
    )
}

const HourlyForecastCard = ({hours}) => {
    return (
        <>
            {hours.map((hour, index) =>
                <div
                    key={index}
                    className="flex justify-between items-center  bg-neutral-700 rounded-lg p-2 border border-neutral-600">
                    <div className="flex items-center gap-4">
                        <img src={hour.weather_code} alt="icon" className="w-8"/>
                        <h4>{getAMPMCode(hour.hour)}</h4>
                    </div>
                    <p className="text-neutral-300">{hour.temperature}°</p>
                </div>
            )}
        </>
    )
}

export default HourlyForecast;