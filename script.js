const apiKey = "586a544f1f5ce21b3d62aa5134a2111f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorDiv = document.querySelector(".error");
const weatherDiv = document.querySelector(".weather");

let debounceTimer;

searchBtn.addEventListener("click", () => {
    fetchWeatherData(searchBox.value);
});

searchBox.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        fetchWeatherData(searchBox.value);
    }, 500);
});

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        displayError(error.message);
    }
}

function updateWeatherUI(data) {
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

    setWeatherIcon(data.weather[0].main);

    weatherDiv.style.display = "block";
    errorDiv.style.display = "none";
}

function displayError(errorMessage) {
    errorDiv.textContent = errorMessage;
    errorDiv.style.display = "block";
    weatherDiv.style.display = "none";
}

function setWeatherIcon(weatherCondition) {
    let iconSrc = "images/clouds.png";

    switch (weatherCondition) {
        case "Clear":
            iconSrc = "images/clear.png";
            break;
        case "Rain":
            iconSrc = "images/rain.png";
            break;
        case "Drizzle":
            iconSrc = "images/drizzle.png";
            break;
        case "Mist":
            iconSrc = "images/mist.png";
            break;
    }

    weatherIcon.src = iconSrc;
}

