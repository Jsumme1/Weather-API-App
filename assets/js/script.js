"use strict";
//List of constants:
const topCityNameEl = document.getElementById("top-city");
const topCityIconEl = document.getElementById("current-icon");
const topCityDateEl = document.getElementById("current-date");
const topCityTempEl = document.getElementById("current-temp");
const topCityWindEl = document.getElementById("current-wind");
const topCityHumidityEl = document.getElementById("current-humidity");
const topCityUviEl = document.getElementById("current-uvi");
const newCitiesEl = document.getElementsByClassName("new-cities");

const dayOneDateEl = document.getElementById("date-day1");
const iconDayOneEl = document.getElementById("icon-day1");
const tempDayOneEl = document.getElementById("temp-day1");
const windDayOneEl = document.getElementById("wind-day1");
const humdityDayOneEl = document.getElementById("humidity-day1");




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

           let currentCity = citySearch;
           topCityNameEl.append(currentCity);

           // turn dt to current date - unix time to normal people time
           let todaysDate = new Date(data2.current.dt * 1000).toLocaleDateString("en-Us");
           topCityDateEl.append(todaysDate);

           let currentTemp = data2.current.temp;
           topCityTempEl.append(currentTemp);

           let currentWindSpeed = data2.current.wind_speed;
           topCityWindEl.append(currentWindSpeed);

           let uvi = data2.current.uvi;
           topCityUviEl.append(uvi);

           let currentHumidity = data2.current.humidity;
           topCityHumidityEl.append(currentHumidity);

           let currentIcon= data2.current.weather[0].icon;
           topCityIconEl.append.currentIcon;

          //  add selected city as button
           $(".new-cities").append("<button></button>").text(citySearch);
           
          // change UVI color
              if (uvi<=2){
               $("#current-uvi").addClass("green");

                } else if (uvi>=3 || uvi<=5) {
                 $("#current-uvi").addClass("yellow");

                } else if (uvi=6 || uvi<=7) {
                 $("#current-uvi").addClass("orange");

               } else {
                 $("#current-uvi").addClass("red");
               };
           
           // for loop to call/display/append 4/5 day forecast

           for (let i = 1; i < 5; i++) {
            
             // turn dt to current date - unix time to normal people time
           let dayOneDate = new Date(data2.daily[i].dt * 1000).toLocaleDateString("en-Us");
           dayOneDateEl.append(dayOneDate);

           let dayOneTemp = data2.daily[i].temp.day;
           tempDayOneEl.append(dayOneTemp);

           let dayOneWindSpeed= data2.daily[i].wind_speed;
           windDayOneEl.append(dayOneWindSpeed);

           let dayOneHumidity= data2.daily[i].humidity;
           humdityDayOneEl.append(dayOneHumidity);

           let dayOneIcon= data2.daily[i].weather[0].icon;
           iconDayOneEl.append(dayOneIcon);
           }
         });
        });  
        });
