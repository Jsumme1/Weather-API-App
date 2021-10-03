"use strict";
//List of constants:
const topCityNameEl = document.getElementById("top-city");
const topCityDateEl = document.getElementById("current-date");
const topCityTempEl = document.getElementById("current-temp");
const topCityWindEl = document.getElementById("current-wind");
const topCityHumidityEl = document.getElementById("current-humidity");
const topCityUviEl = document.getElementById("current-uvi");


const dateEl = document.getElementById("date");
const currentWeatherItems = document.getElementById("current-weather-items");
const form = document.querySelector(".form");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

//function to append html document with current city weather info, add button
function displayCurrentInfo() {
  topCityTempEl.textContent = currentInfo.currentTemp;

  // add button to append to button list
};

// function to pull data for 5/4 day forecast

function displayFourDays (){};

$("#search-btn").click(function (event) {
    event.preventDefault();
    var citySearch = $("#city-input").val();
  console.log(citySearch)

 fetch('https://api.openweathermap.org/data/2.5/forecast?q='+citySearch+'&units=imperial&appid=b21816d3467ea13d650a6252dc04b76a'
     )
       .then(function (response) {
        return response.json();
       })
      .then(function (data) {
        console.log(data.city.coord.lat);
        console.log(data.city.coord.lon);
        var latitude = data.city.coord.lat;
        var longitude = data.city.coord.lon;

            
       return fetch(
        'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&exclude=minutely,hourly,alerts&units=imperial&appid=b21816d3467ea13d650a6252dc04b76a'
       )
         .then(function (response) {
           return response.json();
         })
         .then(function (data2) {
           console.log(data2);
           console.log(data2.current.temp);
           console.log(data2.current.wind_speed);
           console.log(data2.current.humidity);
           console.log(data2.current.uvi);

          const currentInfo = {
            // turn dt to current date - unix time to normal people time
            todaysDate: new Date(data2.current.dt * 1000).toLocaleDateString(
              "en-Us"
            ),
            currentTemp: data2.current.temp,
            currentWindSpeed: data2.current.wind_speed,
            currentHumidity: data2.current.humidity,
            uvi: data2.current.uvi,
           
           
            //  save dayOne data (tomorrow) constant
            dayOneDate: new Date(data2.daily[1].dt * 1000).toLocaleDateString(
              "en-Us"
            ),
            dayOneTemp: data2.daily[1].temp.day,
            dayOneWindSpeed: data2.daily[1].wind_speed,
            dayOneHumidity: data2.daily[1].humidity,
            dayOneIcon: data2.daily[1].weather[0].icon,
          }; 

          //  call function to display/append current data
          displayCurrentWeather(currentInfo);
        
          // for loop to call/display/append 4/5 day forecast
           
         });


     });

     

    });
 

 
                    
