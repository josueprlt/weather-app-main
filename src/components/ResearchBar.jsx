import {IconSearch} from "./icons.jsx";

export const ResearchBar = ({placeholder = "Search for a place..."}) => {
    return (
        <div className="relative w-72 sm:w-86">
            <span className="pointer-events-none absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                <IconSearch/>
            </span>
            <input type="text" name="researchBar" placeholder={placeholder} className="w-full appearance-none pl-10 sm:pl-12 py-1 sm:py-3 rounded-lg bg-neutral-800 border border-transparent transition duration-200 placeholder:text-neutral-200"/>
        </div>
    )
}

export default ResearchBar;