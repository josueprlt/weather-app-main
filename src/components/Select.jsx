import {IconUnits, IconDropdown} from "./icons.jsx";

export const Select = ({icon = "none", children, color = "800", otherSelect = []}) => {
    const icons = {
        "units": <IconUnits/>,
        "none": null,
    }

    const bgColor = {
        "800": "bg-neutral-800",
        "700": "bg-neutral-700",
        "600": "bg-neutral-600",
    }

    return (
        <div>
            <div className="w-min relative">
                <span className="pointer-events-none absolute left-2 top-1/2 transform -translate-y-1/2">
                    {icons[icon]}
                </span>

                <select
                    id="modern-select"
                    className={`appearance-none ${icon === "none" ? "pr-7 pl-2" : "px-7 sm:px-10"} text-center py-1 sm:py-3 rounded-lg ${bgColor[color]} border border-transparent transition duration-200 cursor-pointer`}
                >
                    {otherSelect.map((option, index) => <option key={index} value={option}>{option}</option>)}
                </select>

                <span className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                    <IconDropdown/>
                </span>
            </div>
        </div>
    )
}

export default Select;