import { API_KEY } from "./config.js";

const apiKey = API_KEY;
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
const searchBar = document.querySelector(".search input");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    console.log("Request URL:", apiURL);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();
        console.log(data);

    
        //sunrise sunset 

        let timezoneOffset = data.timezone * 1000; // Convert from seconds to milliseconds

        // sunrise time calculation
        let sunriseTimestamp = new Date((data.sys.sunrise * 1000) + timezoneOffset);
        let sunriseHours = sunriseTimestamp.getUTCHours();
        let sunriseMinutes = "0" + sunriseTimestamp.getUTCMinutes();
        let formattedSunriseTime = sunriseHours + ':' + sunriseMinutes.substr(-2);

        // sunset time calculation
        let sunsetTimestamp = new Date((data.sys.sunset * 1000) + timezoneOffset);
        let sunsetHours = sunsetTimestamp.getUTCHours();
        let sunsetMinutes = "0" + sunsetTimestamp.getUTCMinutes();
        let formattedSunsetTime = ((sunsetHours % 12) || 12) + ':' + sunsetMinutes.substr(-2);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°";
    document.querySelector(".humiditydata").innerHTML = data.main.humidity+"%";
    document.querySelector(".winddata").innerHTML = Math.round(data.wind.speed) + "mph";
    document.querySelector(".hilo").innerHTML = "H:"+ Math.round(data.main.temp_max)+ "°" + 
    " L:"+Math.round(data.main.temp_min)+"°";
    document.querySelector(".feelsdata").innerHTML = Math.round(data.main.feels_like)+ "°";
    document.querySelector(".sunrisedata").innerHTML = (formattedSunriseTime+"am");
    document.querySelector(".sunsetdata").innerHTML = (formattedSunsetTime+"pm");
    document.querySelector(".pressuredata").innerHTML = Math.round(data.main.pressure*0.02953)+"inHg";



    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "3d weather icons/sun/27.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "3d weather icons/cloud/7.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "3d weather icons/sun/26.png";
    }
    else if(data.weather[0].main == "Thunderstorm"){
        weatherIcon.src = "3d weather icons/cloud/12.png";
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "3d weather icons/cloud/18.png";
    }
    else if(data.weather[0].main == "Haze"){
        weatherIcon.src = "3d weather icons/cloud/35.png";
    }
    else if(data.weather[0].main == "Fog"){
        weatherIcon.src = "3d weather icons/cloud/35.png";
    }
    
    document.querySelector(".weather").style.display = "block";
    
    }
    
    
}

searchBar.addEventListener('keyup', (event)=>{
    if(event.which === 13){
        checkWeather(searchBar.value);
    }
})