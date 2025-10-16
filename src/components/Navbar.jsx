import {IconLogo} from "./icons.jsx";
import Select from "./Select.jsx";

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between p-4 sm:mx-8 md:mx-14 sm:my-4">
            <IconLogo className="w-32 sm:w-48" />
            <Select icon="units" >Units</Select>
        </nav>
    )
}

export default Navbar;