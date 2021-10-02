"use strict";
//List of constants:
const timeEl = document.getElementById("time");
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

          // turn dt to current date - unix time to normal people time
           const todaysDate = new Date(data2.current.dt*1000).toLocaleDateString("en-Us");
           console.log(todaysDate);
          //  save current data as const
           const currentTempEl = data2.current.temp;
           const currentWindSpeedEl = data2.current.wind_speed;
           const currentHumidityEl = data2.current.humidity;
           const uviEl = data2.current.uvi;

          //  save dayOne data (tomorrow)
          const dayOneDate = new Date(data2.daily[1].dt * 1000
          ).toLocaleDateString("en-Us");
          const dayOneTempEl = data2.daily[1].temp.day;
          const dayOneWindSpeedEl = data2.daily[1].wind_speed;
          const dayOneHumidityEl = data2.daily[1].humidity;
          const dayOneIcon = data2.daily[1].weather[0].icon;


          console.log(
            new Date(data2.daily[1].dt * 1000).toLocaleDateString("en-Us")
          );
           console.log(data2.daily[1].temp.day);
           console.log(data2.daily[1].wind_speed);
           console.log(data2.daily[1].humidity);
           console.log(data2.daily[1].weather[0].icon);
           
         });


     });

    });
 


