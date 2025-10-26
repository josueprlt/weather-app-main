export function getDayCode(code) {
    const map = {
        1: "Monday",
        2: "Tuesday",
        3: "Wedsnesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        0: "Sunday",
    };

    return map[code];
}

export default getDayCode;