import {IconSearch} from "./icons.jsx";

export const ResearchBar = ({placeholder = "Search for a place..."}) => {
    return (
        <div>
            <span>
                <IconSearch/>
            </span>
            <input type="text" placeholder={placeholder} className="w-min appearance-none pl-2 sm:pl-5 py-1 sm:py-3 rounded-xl bg-neutral-800 border border-transparent transition duration-200"/>
        </div>
    )
}

export default ResearchBar;