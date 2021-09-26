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
    var citySearch = $("#text-input").val();
  console.log(citySearch)

   fetch('https://api.openweathermap.org/data/2.5/forecast?q='+citySearch+'&units=imperial&appid=b21816d3467ea13d650a6252dc04b76a'
     )
       .then(function (response) {
        return response.json();
       })
      .then(function (data) {
        console.log(data);
        console.log(data.list[0].dt_txt);
        console.log(data.list[0].main.temp);
        var dateTitle=$("#date");
        dateTitle.txt(data.list[0].dt_txt);
     });
});
