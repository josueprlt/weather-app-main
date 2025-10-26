import {SyncLoader} from "react-spinners";
import {useEffect, useState} from "react";
import FetchWeatherCard from "../services/FetchWeatherCard";

export const WeatherCard = ({ coords }) => {
    const [state, setState] = useState({data: null, loading: true, error: null});
    const [location, setLocation] = useState(null);
    const [time, setTime] = useState(null);

    useEffect(() => {
        async function loadWeather() {
            const result = await FetchWeatherCard();
            setState(result);
        }

        loadWeather();
    }, []);

    useEffect(() => {
        if (!state.timezone) return;

        const ti = state.current.time;
        const date = new Date(ti);

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        setTime(date.toLocaleDateString('en-US', options));
    }, [state]);

    if (state.loading || coords.loading) return (
        <div
            className="flex flex-col justify-center gap-6 items-center my-4 sm:my-0 w-full h-[228px] sm:h-[286px] bg-neutral-800 rounded-xl">
            <SyncLoader color="#fff" size={15}/>
            <span>Loading...</span>
        </div>
    )
    if (state.error) return <div className="text-red-500">Error: {state.error}</div>;

    return (
        <div
            className="flex p-3 flex-col sm:flex-row justify-around items-center my-4 sm:my-0 w-full sm:h-[286px] relative bg-[url('./bg-today-small.svg')] sm:bg-[url('./bg-today-large.svg')] bg-cover bg-center overflow-hidden rounded-xl">
            <div className="flex justify-center items-center sm:items-start flex-col gap-2 sm:gap-4 pt-5 sm:pt-0">
                <h2 className="text-2xl font-bold">{coords.city}, {coords.country}</h2>
                <p className="text-md text-neutral-200">{time}</p>
            </div>

            <div className="flex items-center gap-2 sm:gap-6">
                <img className="w-30" src={state.current.weather_code[0]} alt="soleil"/>
                <h3 className="text-6xl italic font-bold sm:text-8xl">{state.current.temperature_2m}°</h3>
            </div>
        </div>
    )
}

export default WeatherCard;