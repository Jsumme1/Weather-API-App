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

const dayOneDate = document.getElementById("date-day1");
const iconDayOne = document.getElementById("icon-day1");
const tempDayOne = document.getElementById("temp-day1");
const windDayOne= document.getElementById("wind-day1");
const humdityDayOne = document.getElementById("humidity-day1");




// function to pull data for 5/4 day forecast

// function displayFourDays (){
//   dayOneDate.textContent = dayOneDate;
//   iconDayOne.textContent = dayOneIcon;
//   tempDayOne.textContent = dayOneTemp;
//   humdityDayOne.textContent = dayOneHumidity;
//   windDayOne.textContent = dayOneWindSpeed;
// };

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
             currentIcon: data2.current.weather[0].icon,
             currentTemp: data2.current.temp,
             currentWindSpeed: data2.current.wind_speed,
             currentHumidity: data2.current.humidity,
             uvi: data2.current.uvi,
             currentCity: citySearch,
           };

           //function to append html document with current city weather info, add button
           function displayCurrentWeather() {
             topCityTempEl.textContent = currentInfo.currentTemp;
             topCityNameEl.textContent = currentInfo.currentCity;
             topCityIconEl.textContent = currentInfo.currentIcon;
             topCityDateEl.textContent = currentInfo.todaysDate;
             topCityWindEl.textContent = currentInfo.currentWindSpeed;
             topCityHumidityEl.textContent = currentinfo.CurrentHumidity;
             topCityUviEl.textContent = currentinfo.uvi;

             // add button to append to button list
             $(".new-cities").append("<button>'currentCity'</button>");

            // //  change UVI color
            //  if (uvi<=2){
            //   topCityUviEl.addClass("green");

            //    } else if (uvi>=3 || uvi<=5) {
            //     topCityUviEl.addClass("yellow");

            //    } else if (uvi=6 || uvi=7) {
            //     topCityUviEl.addClass("orange");

            //   } else {
            //     topCityUviEl.addClass("red");
            //   };
           };

           //  call function to display/append current data
          displayCurrentWeather(currentinfo);

           //  save dayOne data (tomorrow) constant
            // for loop to call/display/append 4/5 day forecast

           for (let i=1; i<5; i++){
           const DailyInfo = {
             dayOneDate: new Date(data2.daily[i].dt * 1000).toLocaleDateString(
               "en-Us"
             ),
             dayOneTemp: data2.daily[i].temp.day,
             dayOneWindSpeed: data2.daily[i].wind_speed,
             dayOneHumidity: data2.daily[i].humidity,
             dayOneIcon: data2.daily[i].weather[0].icon,
           };
           console.log(data2.daily[i].temp.day)
          };

          
         });


     });

     

    });
 

 
                    
