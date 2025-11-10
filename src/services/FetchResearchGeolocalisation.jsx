export default async function fetchResearchGeolocalisation(research) {
    try {
        const nominatimUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${research}`;
        const res = await fetch(nominatimUrl);
        const data = await res.json();

        return data;

    } catch (err) {
        console.warn("Erreur lors de la récupération des détails de géolocalisation :", err);
        return { error: err.message, data: null, loading: false };
    }
}