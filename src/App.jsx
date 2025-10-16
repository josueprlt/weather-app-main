import Navbar from "./components/Navbar";
import ResearchBar from "./components/ResearchBar";

function App() {
    return (
        <>
            <Navbar />

            <h1 className="text-center text-xl my-8 sm:my-16 sm:text-3xl md:text-4xl font-bold font-bricolage-grotesque">How's the sky looking today?</h1>

            <ResearchBar />

            Switch to Imperial/Metric

            Temperature

            Celsius (°C)
            Fahrenheit (°F)

            Wind Speed

            km/h
            mph

            Precipitation

            Millimeters (mm)
            Inches (in)

            Search for a city, e.g., New York
            Search

            Feels like
            Insert temperature here

            Humidity
            Insert humidity here

            Wind
            Insert wind here

            Precipitation
            Insert precipitation here

            Daily forecast
            Insert daily forecast for the next 7 days here

            Hourly forecast
            Insert hourly forecast for the selected day here

            <div className="attribution">
                Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
                Coded by <a href="#">Your Name Here</a>.
            </div>
        </>
    )
}

export default App
