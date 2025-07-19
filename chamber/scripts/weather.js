const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("#weather-description");
const currentTemp = document.querySelector(".current-temp");
const weatherToday = document.querySelector("#weather-today");
const weatherTomorrow = document.querySelector("#weather-tomorrow");
const weatherOverTomorrow = document.querySelector("#weather-overtomorrow");

const myKey = "2a9c89d27a3cf71379ec692d85fe0e0c";
const myLat = -7.115250;
const myLong = -34.861050;

const myURL = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

async function apiCurrentFetch() {
    try {
        const response = await fetch(myURL);
        if (response.ok) {
            const data = await response.json();
            displayCurrentResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
        captionDesc.innerHTML = "Error loading weather";
    }
}

async function apiForecastFetch() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            displayForecastResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
        weatherToday.innerHTML = "Error loading forecast";
    }
}

function displayCurrentResults(data) {
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);
    captionDesc.innerHTML = desc;
    currentTemp.innerHTML = `${Math.round(data.main.temp)}°C`; 
}

function displayForecastResults(data) {
    
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
    
    
    const today = new Date();
    const dayNames = ["today", 
                      new Date(today.getTime() + 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { weekday: "long" }),
                      new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { weekday: "long" })];

    
    let todayDesc = dailyData[0].weather[0].description;
    let tomorrowDesc = dailyData[1].weather[0].description;
    let overTomorrowDesc = dailyData[2].weather[0].description;

    todayDesc = todayDesc.charAt(0).toUpperCase() + todayDesc.slice(1);
    tomorrowDesc = tomorrowDesc.charAt(0).toUpperCase() + tomorrowDesc.slice(1);
    overTomorrowDesc = overTomorrowDesc.charAt(0).toUpperCase() + overTomorrowDesc.slice(1);

    
    weatherToday.innerHTML = `${dayNames[0]}: Máx ${Math.round(dailyData[0].main.temp_max)}°C, Mín ${Math.round(dailyData[0].main.temp_min)}°C, ${todayDesc}`;
    weatherTomorrow.innerHTML = `${dayNames[1]}: Máx ${Math.round(dailyData[1].main.temp_max)}°C, Mín ${Math.round(dailyData[1].main.temp_min)}°C, ${tomorrowDesc}`;
    weatherOverTomorrow.innerHTML = `${dayNames[2]}: Máx ${Math.round(dailyData[2].main.temp_max)}°C, Mín ${Math.round(dailyData[2].main.temp_min)}°C, ${overTomorrowDesc}`;
}

apiCurrentFetch();
apiForecastFetch();