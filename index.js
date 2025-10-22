let apiKey = "7K26VXR2V2A5L6A5KKMD42T4X";
const locationInput = document.querySelector("#location");
const unitGroupSwitchBtn = document.querySelector(".unitGroupSwitch");
const weatherForm = document.querySelector(".weatherForm");
const weatherDetailsContainer = document.querySelector(".locationWeatherDetails");

async function getWeather(location, unitGroup) {
    let locationData;
    if(unitGroup === "C"){
        locationData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&unitGroup=metric`);
    }else{
        locationData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&unitGroup=us`);
    }

    let responseJson = await locationData.json(); 
    let locationWeatherDetails = processLocationData(responseJson);

    addToDom(locationWeatherDetails);

    // console.log(locationWeatherDetails);
    // console.log(responseJson);
}

function processLocationData(jsonResponse){
    const weatherDetails =  {
        condition: jsonResponse.currentConditions.conditions,
        dateTime: new Date(jsonResponse.currentConditions.datetimeEpoch * 1000),
        temp: jsonResponse.currentConditions.temp,
        feelsLike: jsonResponse.currentConditions.feelslike,
        humidity: jsonResponse.currentConditions.humidity,
        visibility: jsonResponse.currentConditions.visibility,
        windSpeed: jsonResponse.currentConditions.windspeed,
    }

    return weatherDetails;
}

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputLocation = locationInput.value;
    let currentUnit = unitGroupSwitchBtn.value;
    getWeather(inputLocation, currentUnit);
})

function addToDom(processedJson){
    let container = document.createElement("div");

    let cityName = document.createElement("h2");
    cityName.textContent = locationInput.value;

    let currentDate = document.createElement("p");
    currentDate.textContent = processedJson.dateTime;

    let currentCondition = document.createElement("p");
    currentCondition.textContent = processedJson.condition;

    let currentTemp = document.createElement("p");
    let currentFeelsLike = document.createElement("p");

    let currentHumidity = document.createElement("p");
    currentHumidity.textContent = `${processedJson.humidity} %`;

    let currentVisibility = document.createElement("p");
    let currentWindSpeed = document.createElement("p");

    if(unitGroupSwitchBtn.value === "C"){
        currentTemp.textContent = `${processedJson.temp} °C`;
        currentFeelsLike.textContent = `${processedJson.feelsLike} °C`;
        currentVisibility.textContent = `${processedJson.visibility} km`;
        currentWindSpeed.textContent = `${processedJson.windSpeed} km`;
    }else {
        currentTemp.textContent = `${processedJson.temp} °F`;
        currentFeelsLike.textContent = `${processedJson.feelsLike} °F`;
        currentVisibility.textContent = `${processedJson.visibility} mi`;
        currentWindSpeed.textContent = `${processedJson.windSpeed} mph`;
    }

    container.append(cityName, currentDate, currentCondition, currentTemp, currentFeelsLike, currentHumidity, currentVisibility, currentWindSpeed);
    weatherDetailsContainer.appendChild(container);
}