import {IconLoading} from "./icons";
import ReactCountryFlag from "react-country-flag";

export const DropDown = ({childs, props, open = false, loading = false, setLatitude, setLongitude}) => {
    if (!open) return null;

    return (
        <div className={`bg-neutral-800 rounded-lg p-2 ${props}`}>
            <DropDownChild lists={childs} loading={loading} setLatitude={setLatitude} setLongitude={setLongitude}/>
        </div>
    );
};

const DropDownChild = ({lists, loading, setLatitude, setLongitude}) => {
    if (loading) {
        return (
            <div className="flex gap-2 items-center py-2 px-4">
                <IconLoading className="animate-spin"/>
                <p>Search in progress...</p>
            </div>
        );
    }

    if (!lists?.results?.length) {
        return (
            <div className="text-center py-2 px-4">
                <p>No search result found!</p>
            </div>
        );
    }

    const handleClick = (latitude, longitude) => {
        setLatitude(latitude);
        setLongitude(longitude);
        console.log(latitude)
        console.log(longitude)
    }

    return (
        <>
            {lists.results.map((list, index) => (
                <div key={index} onClick={() => handleClick(list.latitude, list.longitude)} className="flex gap-2 items-center py-2 px-4 border border-neutral-800 rounded-lg hover:bg-neutral-700 hover:border hover:border-neutral-600 transition cursor-pointer">
                    <div className="relative flex items-center justify-center w-8 h-6 rounded-xl overflow-hidden">
                        <ReactCountryFlag
                            countryCode={list.country_code}
                            svg
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                            }}
                            title={list.country}
                        />
                    </div>
                    <p>
                        {list.name}, {list.admin1}, {list.country}
                    </p>
                </div>
            ))}
        </>
    );
};

export default DropDown;
