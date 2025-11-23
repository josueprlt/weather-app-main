import {IconLogo} from "./icons.jsx";
import DropDownPreferences from "./DropDownPreferences.jsx";
import Button from "./Button.jsx";
import {useState} from "react";

export const Navbar = () => {
    const [openDropdownPreferences, setOpenDropdownPreferences] = useState(false);

    const handleClick = () => {
        setOpenDropdownPreferences(!openDropdownPreferences);
    }

    return (
        <nav className="flex items-center justify-between p-4 sm:mx-8 md:mx-14 sm:my-4">
            <IconLogo className="w-32 sm:w-48"/>
            <div className="relative">
                <Button color="gray" icon="units" onclick={handleClick}>Units</Button>
                <DropDownPreferences props={"absolute right-0 top-full mt-2 z-10"} open={openDropdownPreferences}/>
            </div>
        </nav>
    )
}

export default Navbar;