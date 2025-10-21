export function getWeatherCode(codes) {
    let newCodes = [];

    const map = {
        0: "./icon-sunny.webp",
        1: "./icon-partly-cloudy.webp",
        2: "./icon-partly-cloudy.webp",
        3: "./icon-overcast.webp",
        45: "./icon-fog.webp",
        48: "./icon-snow.webp",
        51: "./icon-rain.webp",
        53: "./icon-rain.webp️",
        55: "./icon-rain.webp",
        61: "./icon-rain.webp",
        63: "./icon-rain.webp",
        65: "./icon-rain.webp",
        80: "./icon-rain.webp",
        81: "./icon-rain.webp",
        82: "./icon-rain.webp",
        95: "./icon-storm.webp",
        96: "./icon-storm.webp",
        99: "./icon-storm.webp",
    };

    for (const code of codes) {
        newCodes.push(map[code]);
    }

    return newCodes;
}

export default getWeatherCode;