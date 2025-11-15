import {useEffect, useState} from "react";
import {IconCheckmark} from "./icons";

export const DropDownPreferences = ({props, open = false}) => {
    const [preferences, setPreferences] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("Preferences")) {
            setPreferences(JSON.parse(localStorage.getItem("Preferences")))
        }
    }, []);

    if (!open) return null;

    return (
        <div className={`bg-neutral-800 rounded-lg p-2 ${props}`}>
            <DropDownChild preferences={preferences}/>
        </div>
    );
};

const DropDownChild = ({preferences}) => {
    const preferencesTable = [
        {id: "temperature", title: "Temperature", lists: [{id: "celsius", name: "Celsius (°C)"}, {id: "fahrenheit", name: "Fahrenheit (°F)"}]},
        {id: "wind", title: "Wind Speed", lists: [{id: "km/h", name: "km/h"}, {id: "mph", name: "mph"}]},
        {id: "precipitation", title: "Precipitation", lists: [{id: "mm", name: "Millimeters (mm)"}, {id: "in", name: "Inches (in)"}]},
    ]

    const handleClick = (idPreference, idList) => {
        const newPreferences = {...preferences, [idPreference]: idList};
        localStorage.setItem("Preferences", JSON.stringify(newPreferences));
        window.location.reload();
    }

    return (
        <div className="flex flex-col gap-2 w-[200px] py-2 border border-neutral-800 rounded-lg">
            {preferencesTable.map((preference, index) => (
                <div
                    key={index}
                    className={`flex flex-col gap-1 ${index !== preferencesTable.length - 1 && "border-b border-neutral-600 pb-2"}`}>
                    <p className="text-neutral-300 text-sm pl-2">{preference.title}</p>

                    {preference.lists.map((list, index) => (
                        <div key={index}
                             onClick={() => handleClick(preference.id, list.id)}
                             className={`flex justify-between items-center rounded-lg p-2 border border-neutral-800 hover:bg-neutral-700 hover:border hover:border-neutral-600 transition cursor-pointer 
                             ${(preferences.precipitation === list.id || preferences.temperature === list.id || preferences.wind === list.id)
                             && "bg-neutral-700 border border-neutral-600"}`}>

                            <p>{list.name}</p>
                            {(preferences.precipitation === list.id || preferences.temperature === list.id || preferences.wind === list.id) && <IconCheckmark className="w-4 h-4" />}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default DropDownPreferences;
