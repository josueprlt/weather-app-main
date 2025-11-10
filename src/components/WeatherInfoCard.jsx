import {useState, useEffect} from "react";
import FetchWeatherCard from "../services/FetchWeatherCard";
import {SyncLoader} from "react-spinners";

export const WeatherInfoCards = ({latitude = null, longitude = null, setError}) => {
    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect(() => {
        async function loadWeather() {
            let result;
            setState({data: null, loading: true, error: null})

            if (latitude && longitude) {
                result = await FetchWeatherCard(latitude, longitude);
            } else {
                result = await FetchWeatherCard();
            }
            if (result.error) setError(result.error);

            setState(result);
        }

        loadWeather();
    }, [latitude, longitude]);

    const InfoCards = [
        {id: "feelslike", title: "Feels like"},
        {id: "humidity", title: "Humidity"},
        {id: "wind", title: "Wind"},
        {id: "precipitation", title: "Precipitation"}
    ]

    if (state.loading) return (
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {InfoCards.map((card, index) =>
                <div key={index}
                     className="bg-neutral-800 rounded-lg p-4 flex flex-col gap-2 border border-neutral-600">
                    <h4 className="text-neutral-300">{card.title}</h4>
                    <p className="text-2xl font-extralight">-</p>
                </div>
            )}
        </section>
    )
    if (state.error) return <div className="text-red-500">Error: {state.error}</div>;

    return (
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {InfoCards.map((card, index) => <WeatherInfoCard key={index} {...card} state={state}/>)}
        </section>
    )
}

const WeatherInfoCard = ({title, id, state}) => {
    return (
        <div className="bg-neutral-800 rounded-lg p-4 flex flex-col gap-2 border border-neutral-600">
            <h4 className="text-neutral-300">{title}</h4>
            <p className="text-2xl font-extralight">{id === "feelslike" ? `${state.current.apparent_temperature}°` : id === "humidity" ? `${state.current.relative_humidity_2m}%` : id === "wind" ? `${state.current.wind_speed_10m} km/h` : id === "precipitation" && `${state.current.precipitation} mm`}</p>
        </div>
    )
}

export default WeatherInfoCards;