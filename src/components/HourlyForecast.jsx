export const HourlyForecast = () => {
    const InfoCards = [
        {
            icon: "./icon-overcast.webp",
            hour: "3 PM",
            degrees: "20"
        }, {
            icon: "./icon-partly-cloudy.webp",
            hour: "4 PM",
            degrees: "20"
        }, {
            icon: "./icon-sunny.webp",
            hour: "5 PM",
            degrees: "20"
        }, {
            icon: "./icon-overcast.webp",
            hour: "6 PM",
            degrees: "19"
        }, {
            icon: "./icon-snow.webp",
            hour: "7 PM",
            degrees: "18"
        }, {
            icon: "./icon-fog.webp",
            hour: "8 PM",
            degrees: "18"
        }, {
            icon: "./icon-snow.webp",
            hour: "9 PM",
            degrees: "17"
        }, {
            icon: "./icon-overcast.webp",
            hour: "10 PM",
            degrees: "17"
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-4">
            {InfoCards.map((card, index) => <HourlyForecastCard key={index} {...card}/>)}
        </div>
    )
}

const HourlyForecastCard = ({icon, hour, degrees}) => {
    return (
        <div className="flex justify-between items-center  bg-neutral-700 rounded-lg p-2 border border-neutral-600">
            <div className="flex items-center gap-4">
                <img src={icon} alt="icon" className="w-8"/>
                <h4>{hour}</h4>
            </div>
            <p className="text-neutral-300">{degrees}°</p>
        </div>
    )
}

export default HourlyForecast;