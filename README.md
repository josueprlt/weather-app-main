# Frontend Mentor - Weather app solution

This is a solution to the [Weather app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/weather-app-K1FhddVm49). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Search for weather information by entering a location in the search bar
- View current weather conditions including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown 
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page


### Links

- Solution URL: [Github repository](https://github.com/josueprlt/weather-app-main)
- Live Site URL: [Github Live Site](https://josueprlt.github.io/weather-app-main)

## My process

### Built with

- Flexbox
- CSS Grid
- Mobile-first workflow
- [React / Vite](https://reactjs.org/) - JS library
- [OpenMeteo API](https://open-meteo.com/en/docs) - Weather data
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework


### What I learned

With this project, I learned how to set up the geolocation system with a success and error callback.

```js
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
```

I also learned to use responsive design more effectively by using the CSS grid system on this project. It was especially well-suited given the layout of the interface.

```html
<section
        className="sm:grid sm:grid-cols-1 lg:sm:grid-cols-3 gap-4 px-4 sm:w-full sm:mx-auto sm:my-8 sm:px-14">
    <div className="flex flex-col justify-start lg:col-span-2">
        <section className="flex flex-col w-full justify-center sm:flex sm:flex-col sm:gap-4">
            <WeatherCard latitude={latitude} longitude={longitude} setError={setError} />
            <WeatherInfoCard latitude={latitude} longitude={longitude} setError={setError} prefs={prefs}/>
        </section>

        <section className="flex flex-col sm:w-full justify-center sm:block">
            <h4 className="my-4 pt-4">Daily Forecast</h4>
            <DailyForecast latitude={latitude} longitude={longitude} setError={setError}/>
        </section>
    </div>
    <section
            className="sm:w-full mt-8 sm:mt-0 p-4 pt-0 max-h-[593px] sm:max-h-[606px] overflow-scroll block bg-neutral-800 rounded-2xl">
        <HourlyForecast latitude={latitude} longitude={longitude} setError={setError}/>
    </section>
</section>
```


### Continued development

I think I’ll come back to the project to add features such as a night/dark mode based on the time and another features if I have time.


### Useful resources

- [OpenMeteo API ressource](https://open-meteo.com/en/docs) - This documentation helped me a lot to understand how to use the OpenMeteo API.
- [TailwindCSS resource](https://tailwindcss.com/docs) - A very useful resource for looking up CSS classes.
- Gemini - AI is always useful for finding solutions to problems.


## Author

- Website - [Josué](https://portfolio-josue.com)
- Frontend Mentor - [@josueprlt](https://www.frontendmentor.io/profile/josueprlt)