import {IconUnits, IconDropdown} from "./icons.jsx";

export const Select = ({icon = "units", children}) => {
    const icons = {
        "units": <IconUnits/>,
    }
    return (
        <div>
            <div className="w-min relative">
                <span className="pointer-events-none absolute left-2 top-1/2 transform -translate-y-1/2">
                    {icons[icon]}
                </span>

                <select
                    id="modern-select"
                    className="appearance-none px-7 sm:px-10 text-center py-1 sm:py-3 rounded-xl bg-neutral-800 border border-transparent transition duration-200 cursor-pointer"
                >
                    <option value="">{children}</option>
                </select>

                <span className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2">
                    <IconDropdown/>
                </span>
            </div>
        </div>
    )
}

export default Select;