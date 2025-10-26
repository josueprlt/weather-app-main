function useGeolocation() {
    if (!("geolocation" in navigator)) {
        return;
    }

    navigator.geolocation.getCurrentPosition(
        // Callback de succès
        (position) => {
            localStorage.setItem("Location", JSON.stringify(position.coords))
        },
        // Callback d'erreur
        (error) => {
            localStorage.removeItem("Location");
        }
    )
    ;
}

export default useGeolocation;