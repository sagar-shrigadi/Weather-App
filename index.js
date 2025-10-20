let apiKey = "7K26VXR2V2A5L6A5KKMD42T4X";

async function getWeather(location, unitGroup) {
    let locationData;
    if(unitGroup === "C"){
        locationData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&unitGroup=metric`);
    }else{
        locationData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}&unitGroup=us`);
    }

    let responseJson = await locationData.json(); 
    let locationWeatherDetails = processLocationData(responseJson);

    console.log(locationWeatherDetails);
    console.log(responseJson);
}

function processLocationData(jsonResponse){
    const weatherDetails =  {
        condition: jsonResponse.currentConditions.conditions,
        dateTime: new Date(jsonResponse.currentConditions.datetimeEpoch * 1000),
        temp: jsonResponse.currentConditions.temp,
        feelsLike: jsonResponse.currentConditions.feelslike,
        humidity: jsonResponse.currentConditions.humidity,
        visibility: `${jsonResponse.currentConditions.visibility} km`,
        windSpeed: `${jsonResponse.currentConditions.windspeed} km`,

    }

    return weatherDetails;
}

getWeather("london", "C");