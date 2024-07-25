const apiKey = "1f04f5317159b4688739a9dffdcbc377";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
    try {
        const res = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await res.json();

        if (res.status === 404 || data.cod === '404') {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            document.querySelector(".city").textContent = data.name;
            document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").textContent = data.main.humidity + "%";
            document.querySelector(".wind").textContent = data.wind.speed + " Km/hr";

            switch (data.weather[0].main) {
                case "Clouds":
                    weatherIcon.src = "images/clouds.png";
                    break;
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "Rain":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "images/mist.png";
                    break;
                default:
                    weatherIcon.src = "images/default.png";
                    break;
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

// Optionally, you can call checkWeather() with a default city when the page loads.
checkWeather('New York');
