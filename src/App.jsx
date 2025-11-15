import {useState, useEffect} from "react";
import Navbar from "./components/Navbar";
import ResearchBar from "./components/ResearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherInfoCard from "./components/WeatherInfoCard";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import useGeolocation from "./utils/useGeolocalisation";
import ApiError from "./components/ApiError";
import DropDownResearchBar from "./components/DropDownResearchBar.jsx";
import fetchResearchGeolocalisation from "./services/FetchResearchGeolocalisation.jsx";

function App() {
    const [error, setError] = useState(null);
    const [openDropdownResearchBar, setOpenDropdownResearchBar] = useState(false);
    const [dataCity, setDataCity] = useState(null);
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [loadingCity, setLoadingCity] = useState(false);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [prefs, setPrefs] = useState(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useGeolocation();

        if (!localStorage.getItem("Preferences")) {
            localStorage.setItem("Preferences", JSON.stringify({
                temperature: "celsius",
                wind: "km/h",
                precipitation: "mm"
            }));
        }

        setPrefs(JSON.parse(localStorage.getItem("Preferences")));
    }, []);

    useEffect(() => {
        if (query.length === 0) {
            setOpenDropdownResearchBar(false);
        } else {
            setOpenDropdownResearchBar(true);
        }

        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);


    useEffect(() => {
        async function loadCity() {
            if (!debouncedQuery) return;
            setLoadingCity(true);
            try {
                const result = await fetchResearchGeolocalisation(debouncedQuery);
                setDataCity(result);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingCity(false);
            }
        }

        loadCity();
    }, [debouncedQuery]);

    const handleFocus = () => {
        if (query.length === 0) return
        setOpenDropdownResearchBar(true);
    }

    const handleBlur = () => {
        setTimeout(() => {
            setOpenDropdownResearchBar(false);
        }, 500)
    }

    return (
        <>
            <Navbar/>

            {error ? <ApiError/> : (
                <>
                    <h1 className="text-center text-xl my-8 sm:my-16 sm:text-3xl md:text-4xl font-bold font-bricolage-grotesque">How's
                        the sky looking today?</h1>

                    <div
                        className="grid grid-cols-4 px-4 w-full max-w-[400px] sm:max-w-[500px] mx-auto gap-2 sm:gap-4 max-xs:flex max-xs:flex-col max-xs:items-center">
                        <div className="relative w-full col-span-4">
                            <ResearchBar props={"w-full"} value={query} setValue={setQuery} handleFocus={handleFocus}
                                         handleBlur={handleBlur}/>
                            <DropDownResearchBar props={"absolute w-full z-1 top-10 sm:top-15 overflow-hidden"}
                                                 open={openDropdownResearchBar}
                                                 childs={dataCity} loading={loadingCity} setLatitude={setLatitude}
                                                 setLongitude={setLongitude}/>
                        </div>
                    </div>

                    <section
                        className="sm:grid sm:grid-cols-1 lg:sm:grid-cols-3 gap-4 px-4 sm:w-full sm:mx-auto sm:my-8 sm:px-14">
                        <div className="flex flex-col justify-start lg:col-span-2">
                            <section className="flex flex-col w-full justify-center sm:flex sm:flex-col sm:gap-4">
                                <WeatherCard latitude={latitude} longitude={longitude} setError={setError} />
                                <WeatherInfoCard latitude={latitude} longitude={longitude} setError={setError} prefs={prefs}/>
                            </section>

                            <section className="flex flex-col sm:w-full justify-center sm:block">
                                <h4 className="my-4 pt-4">Daily Forecast</h4>
                                <DailyForecast latitude={latitude} longitude={longitude} setError={setError}/>
                            </section>
                        </div>
                        <section
                            className="sm:w-full mt-8 sm:mt-0 p-4 pt-0 max-h-[593px] sm:max-h-[606px] overflow-scroll block bg-neutral-800 rounded-2xl">
                            <HourlyForecast latitude={latitude} longitude={longitude} setError={setError}/>
                        </section>
                    </section>
                </>
            )}

            <div
                className="flex flex-wrap justify-center items-center px-4 text-sm mt-8 sm:mt-14 mb-2 sm:gap-2 text-neutral-400">
                        <span>Challenge by <a
                            href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.</span>
                <span>Coded by <a href="https://portfolio-josue.com">Josué</a>.</span>
            </div>
        </>
    )
}

export default App
