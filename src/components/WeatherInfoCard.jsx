export const WeatherInfoCards = () => {
    const InfoCards = [
        {
            title: "Feels like",
            data: "18°"
        },
        {
            title: "Humidity",
            data: "48%"
        },
        {
            title: "Wind",
            data: "14 km/h"
        },
        {
            title: "Precipitation",
            data: "0 mm"
        }
    ]

    return (
        <section className="grid grid-cols-2 gap-4 sm:mx-8 md:mx-14">
            {InfoCards.map((card, index) => <WeatherInfoCard key={index} {...card}/>)}
        </section>
    )
}

const WeatherInfoCard = ({title, data}) => {
    return (
        <div className="bg-neutral-800 rounded-lg p-4 flex flex-col gap-2 border border-neutral-600">
            <h4 className="text-neutral-300">{title}</h4>
            <p className="text-2xl font-extralight">{data}</p>
        </div>
    )
}

export default WeatherInfoCards;