export const DailyForecast = () => {
    const InfoCards = [
        {
            title: "Tue",
            icon: "./icon-rain.webp",
            morning_degrees: "20",
            afternoon_degrees: "14"
        },
        {
            title: "Wed",
            icon: "./icon-drizzle.webp",
            morning_degrees: "21",
            afternoon_degrees: "15"
        },
        {
            title: "Thu",
            icon: "./icon-sunny.webp",
            morning_degrees: "24",
            afternoon_degrees: "14"
        },
        {
            title: "Fri",
            icon: "./icon-partly-cloudy.webp",
            morning_degrees: "25",
            afternoon_degrees: "13"
        },{
            title: "Sat",
            icon: "./icon-storm.webp",
            morning_degrees: "21",
            afternoon_degrees: "15"
        },{
            title: "Sun",
            icon: "./icon-snow.webp",
            morning_degrees: "25",
            afternoon_degrees: "16"
        },{
            title: "Thu",
            icon: "./icon-fog.webp",
            morning_degrees: "24",
            afternoon_degrees: "15"
        },
    ]

    return (
        <div className="grid grid-cols-3 gap-4 sm:mx-8 md:mx-14">
            {InfoCards.map((card, index) => <DailyForecastCard key={index} {...card}/>)}
        </div>
    )
}

const DailyForecastCard = ({title, icon, morning_degrees, afternoon_degrees}) => {
    return (
        <div className="flex items-center bg-neutral-800 rounded-lg p-2 flex-col gap-2 border border-neutral-600">
            <h4>{title}</h4>
            <img src={icon} alt="icon" className="w-15"/>
            <div className="flex w-full justify-between text-neutral-300">
                <p>{morning_degrees}°</p>
                <p>{afternoon_degrees}°</p>
            </div>
        </div>
    )
}

export default DailyForecast;