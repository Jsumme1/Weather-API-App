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

          // make object to hold data
          const currentInfo {
          // turn dt to current date - unix time to normal people time
          todaysDate: new Date(data2.current.dt*1000).toLocaleDateString("en-Us");
          currentTemp: data2.current.temp;
          currentWindSpeed: data2.current.wind_speed;
          currentHumidity:data2.current.humidity;
          uvi: data2.current.uvi;
           //  save dayOne data (tomorrow)
          dayOneDate: new Date(data2.daily[1].dt * 1000).toLocaleDateString("en-Us");
          dayOneTemp: data2.daily[1].temp.day;
          dayOneWindSpeed: data2.daily[1].wind_speed;
          dayOneHumidity: data2.daily[1].humidity;
          dayOneIcon: data2.daily[1].weather[0].icon;
          };

          //  save dayOne data (tomorrow)
          
        
           
         });


     });

    });
 


