import {useEffect, useState} from "react";
import fetchDailyMeteo from "../services/FetchDailyMeteo";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const DailyForecast = ({latitude = null, longitude = null, setError}) => {
    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect(() => {
        async function loadWeather() {
            let result;
            setState({data: null, loading: true, error: null})

            if (latitude && longitude) {
                result = await fetchDailyMeteo(latitude, longitude);
            } else {
                result = await fetchDailyMeteo();
            }
            if (result.error) setError(result.error);

            setState(result);
        }

        loadWeather();
    }, [latitude, longitude]);

    if (state.loading) return (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 md:grid-cols-7">
            {Array.from({length: 7}).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center justify-center bg-neutral-800 rounded-lg flex-col gap-2 border border-neutral-600 h-[134px]"
                >
                    <Skeleton
                        containerClassName="w-full h-full"
                        baseColor="#272541"
                        highlightColor="#3D3B5E"
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
    );
    if (state.error) return <div className="text-red-500">Error: {state.error}</div>;

    const {daily} = state;

    return (
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6 md:grid-cols-7">
            {daily.time.map((day, index) => (
                <DailyForecastCard
                    key={index}
                    title={day}
                    icon={daily.weather_code[index]}
                    morning_degrees={daily.temperature_2m_min[index]}
                    afternoon_degrees={daily.temperature_2m_max[index]}
                />
            ))}
        </div>
    );
};

const DailyForecastCard = ({title, icon, morning_degrees, afternoon_degrees}) => {
    return (
        <div
            className="flex items-center bg-neutral-800 rounded-lg p-3 flex-col gap-2 border border-neutral-600 shadow-sm hover:shadow-md transition">
            <h4 className="text-neutral-200 font-medium">{title.substr(0, 3)}</h4>
            <img src={icon} alt="weather icon" className="w-12 h-12"/>
            <div className="flex w-full justify-between text-neutral-300 text-sm">
                <p>{Math.round(morning_degrees)}°</p>
                <p>{Math.round(afternoon_degrees)}°</p>
            </div>
        </div>
    );
};

export default DailyForecast;
