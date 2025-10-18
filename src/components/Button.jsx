export const Button = ({children, props}) => {
    return (
        <button className={`px-2 sm:px-5 py-1 sm:py-3 rounded-lg bg-blue-500 hover:bg-blue-700 transition duration-200 cursor-pointer ${props}`}>
            {children}
        </button>
    )
}

export default Button;