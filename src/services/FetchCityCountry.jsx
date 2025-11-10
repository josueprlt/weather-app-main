export default async function fetchCityCountry(latitude = null, longitude = null) {
    let coordsData;
    let defaultLatitude = 47.6569;
    let defaultLongitude = -2.762;

    const location = localStorage.getItem("Location");
    if (location !== null) {
        const coords = JSON.parse(location);
        defaultLatitude = coords.latitude;
        defaultLongitude = coords.longitude;
    }

    let locationDetails = {};
    try {
        const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude === null ? defaultLatitude : latitude}&lon=${longitude === null ? defaultLongitude : longitude}&zoom=10&addressdetails=1`;
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