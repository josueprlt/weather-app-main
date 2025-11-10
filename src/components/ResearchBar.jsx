import {IconSearch} from "./icons.jsx";

export const ResearchBar = ({placeholder = "Search for a place...", props, value, setValue, handleFocus, handleBlur}) => {

    const handleresearch = (e) => {
        setValue(e.target.value);
    }

    return (
        <div className={`relative w-full ${props}`}>
            <span className="pointer-events-none absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                <IconSearch/>
            </span>
            <input
                type="text"
                name="researchBar"
                placeholder={placeholder}
                value={value}
                className="w-full appearance-none pl-10 sm:pl-12 py-1 sm:py-3 rounded-lg bg-neutral-800 border border-transparent transition duration-200 placeholder:text-neutral-200 focus:outline-2 focus:outline-offset-2 focus:outline-white"
                onChange={handleresearch}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </div>
    )
}

export default ResearchBar;