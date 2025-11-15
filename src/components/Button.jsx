import {IconRetry, IconUnits} from "./icons";

export const Button = ({children, props, color = "purple", icon = "none", onclick = null}) => {
    const clr = {
        "purple": "bg-blue-500 hover:bg-blue-700 focus:outline-blue-500",
        "gray": "bg-neutral-700 hover:bg-neutral-600 focus:outline-neutral-700"
    }

    const icn = {
        "none": null,
        "retry": <IconRetry/>,
        "units": <IconUnits/>
    }

    return (
        <button
            className={`px-2 sm:px-5 py-1 sm:py-3 rounded-lg transition duration-200 cursor-pointer focus:outline-2 focus:outline-offset-2 ${clr[color]} ${props}`}
            onClick={onclick}
        >
            <div className="flex items-center justify-center gap-2">
                {icn[icon]}
                {children}
            </div>
        </button>
    )
}

export default Button;