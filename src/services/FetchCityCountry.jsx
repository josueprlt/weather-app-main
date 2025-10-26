export default async function fetchCityCountry() {
    let coordsData;
    let latitude = 47.6569; // Default value
    let longitude = -2.762; // Default value

    const location = localStorage.getItem("Location");
    if (location !== null) {
        const coords = JSON.parse(location);
        latitude = coords.latitude;
        longitude = coords.longitude;
    }

    let locationDetails = {};
    try {
        const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;
        const res = await fetch(nominatimUrl);
        const data = await res.json();

        locationDetails = {
            city: data.address.city || data.address.town || data.address.village,
            country: data.address.country,
        };

        return locationDetails;
    } catch (err) {
        console.warn("Erreur lors de la récupération des détails de géolocalisation inverse:", err);
        return { error: err.message, data: null, loading: false };
    }
}