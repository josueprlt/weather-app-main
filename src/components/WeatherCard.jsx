
export const WeatherCard = () => {
    return (
        <div className="flex p-3 mt-2 flex-col sm:flex-row justify-around w-72 h-[286px] sm:w-full sm:max-w-[800px] relative overflow-hidden rounded-lg">
            <div className="flex justify-center items-center sm:items-start flex-col gap-2 sm:gap-4 pt-5 sm:pt-0">
                <h2 className="text-2xl font-bold">Berlin, Germany</h2>
                <p className="text-md text-neutral-200">Tuesday, Aug 5, 2025</p>
            </div>

            <div className="flex items-center gap-2 sm:gap-6">
                <img className="w-30" src="./icon-sunny.webp" alt="soleil"/>
                <h3 className="text-6xl italic font-bold sm:text-8xl">20°</h3>
            </div>
            <img src="./bg-today-large.svg" alt="nuages" className="absolute top-0 left-0 w-full h-full -z-10 hidden sm:block"/>
            <img src="./bg-today-small.svg" alt="nuages" className="absolute top-0 left-0 w-full h-full -z-10 sm:hidden"/>
        </div>
    )
}

export default WeatherCard;