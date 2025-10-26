import {useState, useEffect} from "react";
import Navbar from "./components/Navbar";
import ResearchBar from "./components/ResearchBar";
import Button from "./components/Button";
import WeatherCard from "./components/WeatherCard";
import WeatherInfoCard from "./components/WeatherInfoCard";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import Select from "./components/Select";
import useGeolocation from "./utils/useGeolocalisation";
import FetchCityCountry from "./services/FetchCityCountry";

function App() {
    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useGeolocation();
    }, []);

    useEffect(() => {
        async function loadCoords() {
            const result = await FetchCityCountry();
            setState(result);
        }

        loadCoords();
    }, []);

    return (
        <>
            <Navbar/>

            <h1 className="text-center text-xl my-8 sm:my-16 sm:text-3xl md:text-4xl font-bold font-bricolage-grotesque">How's
                the sky looking today?</h1>

            <div
                className="grid grid-cols-4 px-4 w-full max-w-[400px] sm:max-w-[500px] mx-auto gap-2 sm:gap-4 max-xs:flex max-xs:flex-col max-xs:items-center">
                <ResearchBar props={"w-full col-span-3"}/>
                <Button props={"w-full"}>Search</Button>
            </div>

            <section
                className="sm:grid sm:grid-cols-1 lg:sm:grid-cols-3 gap-4 px-4 sm:w-full sm:mx-auto sm:my-8 sm:px-14">
                <div className="flex flex-col justify-start lg:col-span-2">
                    <section className="flex flex-col w-full justify-center sm:flex sm:flex-col sm:gap-4">
                        <WeatherCard coords={state}/>
                        <WeatherInfoCard/>
                    </section>

                    <section className="flex flex-col sm:w-full justify-center sm:block">
                        <h4 className="my-4 pt-4">Daily Forecast</h4>
                        <DailyForecast/>
                    </section>
                </div>
                <section
                    className="sm:w-full mt-8 sm:mt-0 p-4 pt-0 max-h-[593px] sm:max-h-[606px] overflow-scroll block bg-neutral-800 rounded-2xl">
                    <HourlyForecast/>
                </section>
            </section>


            <div
                className="flex flex-wrap justify-center items-center px-4 text-sm mt-8 sm:mt-14 mb-2 sm:gap-2 text-neutral-400">
                <span>Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.</span>
                <span>Coded by <a href="https://portfolio-josue.com">Josué</a>.</span>
            </div>
        </>
    )
}

export default App
