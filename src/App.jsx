import Navbar from "./components/Navbar";
import ResearchBar from "./components/ResearchBar";
import Button from "./components/Button";
import WeatherCard from "./components/WeatherCard";
import WeatherInfoCard from "./components/WeatherInfoCard";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";
import Select from "./components/Select";

function App() {
    return (
        <>
            <Navbar/>

            <h1 className="text-center text-xl my-8 sm:my-16 sm:text-3xl md:text-4xl font-bold font-bricolage-grotesque">How's
                the sky looking today?</h1>

            <div className="flex flex-col px-4 w-full items-center justify-center gap-2 sm:gap-4 sm:flex-row">
                <ResearchBar props={"w-full"}/>
                <Button props={"w-72 sm:w-min"}>Search</Button>
            </div>

            <section className="flex flex-col w-72 sm:w-full justify-center mx-auto sm:block sm:mx-8 md:mx-14">
                <WeatherCard/>
                <WeatherInfoCard/>
            </section>

            <section className="flex flex-col w-72 sm:w-full justify-center mx-auto sm:block sm:mx-8 md:mx-14">
                <h4 className="my-4 pt-4">Daily Forecast</h4>
                <DailyForecast/>
            </section>

            <section
                className="flex flex-col w-72 sm:w-full justify-center mx-auto mt-8 p-4 sm:block sm:mx-8 md:mx-14 bg-neutral-800 rounded-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h4>Hourly Forecast</h4>
                    <Select icon="none" color="600">Tuesday</Select>
                </div>
                <HourlyForecast/>
            </section>


            <div className="flex flex-wrap justify-center items-center px-4 text-sm mt-8 text-neutral-400">
                <span>Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.</span>
                <span>Coded by <a href="https://portfolio-josue.com">Josué</a>.</span>
            </div>
        </>
    )
}

export default App
