const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const searchCity = document.querySelector(".search-city");
const weatherInfo = document.querySelector(".weather-info");
const notFound = document.querySelector(".not-found");

const countryTxt = document.querySelector(".country-txt");
const tempTxt = document.querySelector(".temp-txt");
const conditionTxt = document.querySelector(".condition-txt");
const humidityValueTxt = document.querySelector(".humidity-value-txt");
const windValueTxt = document.querySelector(".wind-value-txt");
const weatherSummaryImg = document.querySelector(".weather-summary-img");
const currentDateTxt = document.querySelector(".current-date-txt")

const apiKey = "2395ee7966ff6d50a3409f91b57e0dbc";

searchBtn.addEventListener("click", () => {
    if(cityInput.value.trim() != ""){
        updateWeatherInfo(cityInput.value)
        cityInput.value = ""
        cityInput.blur()
    }
})
cityInput.addEventListener("keydown", (event) => {
    if((event.key == "Enter") && (cityInput.value.trim() != "")){
        updateWeatherInfo(cityInput.value)
        cityInput.value = ""
        cityInput.blur()
    }
})

async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`

    const response = await fetch(apiUrl);
    return response.json()
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData("weather", city)
    if(weatherData.cod != 200) {
        showDisplaySection(notFound);
        return
    }
    console.log(weatherData);
    const {
        name: country,
        main: {temp, humidity},
        weather: [{id, main}],
        wind: {speed}
    } = weatherData

    countryTxt.textContent = country;
    tempTxt.textContent = temp + " ℃";
    
    
    showDisplaySection(weatherInfo);
}

function showDisplaySection(section) {
    const sections = [weatherInfo, searchCity, notFound];
    sections.forEach((section) => {
        section.style.display = "none"
    })
    section.style.display = "flex"

}