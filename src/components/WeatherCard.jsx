import {SyncLoader} from "react-spinners";

export const WeatherCard = () => {
    return (
        <div
            className="flex p-3 flex-col sm:flex-row justify-around items-center my-4 sm:my-0 w-full sm:h-[286px] relative bg-[url('./bg-today-small.svg')] sm:bg-[url('./bg-today-large.svg')] bg-cover bg-center overflow-hidden rounded-xl">
            <div className="flex justify-center items-center sm:items-start flex-col gap-2 sm:gap-4 pt-5 sm:pt-0">
                <h2 className="text-2xl font-bold">Berlin, Germany</h2>
                <p className="text-md text-neutral-200">Tuesday, Aug 5, 2025</p>
            </div>

            <div className="flex items-center gap-2 sm:gap-6">
                <img className="w-30" src="./icon-sunny.webp" alt="soleil"/>
                <h3 className="text-6xl italic font-bold sm:text-8xl">20°</h3>
            </div>
        </div>
    )

    /*return (
        <div
            className="flex flex-col justify-center gap-6 items-center my-4 sm:my-0 w-full h-[228px] sm:h-[286px] bg-neutral-800 rounded-xl">
            <SyncLoader color="#fff" size={15}/>
            <span>Loading...</span>
        </div>
    )*/
}

export default WeatherCard;