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

const dayTwoDateEl = document.getElementById("date-day2");
const iconDayTwoEl = document.getElementById("icon-day2");
const tempDayTwoEl = document.getElementById("temp-day2");
const windDayTwoEl = document.getElementById("wind-day2");
const humdityDayTwoEl = document.getElementById("humidity-day2");

const dayThreeDateEl = document.getElementById("date-day3");
const iconDayThreeEl = document.getElementById("icon-day3");
const tempDayThreeEl = document.getElementById("temp-day3");
const windDayThreeEl = document.getElementById("wind-day3");
const humdityDayThreeEl = document.getElementById("humidity-day3");

const dayFourDateEl = document.getElementById("date-day4");
const iconDayFourEl = document.getElementById("icon-day4");
const tempDayFourEl = document.getElementById("temp-day4");
const windDayFourEl = document.getElementById("wind-day4");
const humdityDayFourEl = document.getElementById("humidity-day4");




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

          // stole this from Stack Overflow - get wether icon to display
           let currentIcon= data2.current.weather[0].icon;
           let iconurl = "http://openweathermap.org/img/w/" + currentIcon + ".png";
            $("#wicon").attr("src", iconurl);

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

          //  for (let i = 1; i < 5; i++) { I can't figure out how to split this - put it in an array?
            
             // turn dt to current date - unix time to normal people time
           let dayOneDate = new Date(data2.daily[1].dt * 1000).toLocaleDateString("en-Us");
           dayOneDateEl.append(dayOneDate);

           let dayOneTemp = data2.daily[1].temp.day;
           tempDayOneEl.append(dayOneTemp);

           let dayOneWindSpeed= data2.daily[1].wind_speed;
           windDayOneEl.append(dayOneWindSpeed);

           let dayOneHumidity= data2.daily[1].humidity;
           humdityDayOneEl.append(dayOneHumidity);

           let dayOneIcon= data2.daily[1].weather[0].icon;
           let iconurlOne =
             "http://openweathermap.org/img/w/" + dayOneIcon + ".png";
             $("#wicon1").attr("src", iconurlOne);
           
            let dayTwoDate = new Date(
                data2.daily[2].dt * 1000
              ).toLocaleDateString("en-Us");
              dayTwoDateEl.append(dayTwoDate);

              let dayTwoTemp = data2.daily[2].temp.day;
              tempDayTwoEl.append(dayTwoTemp);

              let dayTwoWindSpeed = data2.daily[2].wind_speed;
              windDayTwoEl.append(dayTwoWindSpeed);

              let dayTwoHumidity = data2.daily[2].humidity;
              humdityDayTwoEl.append(dayTwoHumidity);

              let dayTwoIcon = data2.daily[2].weather[0].icon;
              let iconurlTwo =
                "http://openweathermap.org/img/w/" + dayTwoIcon + ".png";
              $("#wicon2").attr("src", iconurlTwo);

              let dayThreeDate = new Date(
                data2.daily[3].dt * 1000
              ).toLocaleDateString("en-Us");
              dayThreeDateEl.append(dayThreeDate);

              let dayThreeTemp = data2.daily[3].temp.day;
              tempDayThreeEl.append(dayThreeTemp);

              let dayThreeWindSpeed = data2.daily[3].wind_speed;
              windDayThreeEl.append(dayThreeWindSpeed);

              let dayThreeHumidity = data2.daily[3].humidity;
              humdityDayThreeEl.append(dayThreeHumidity);

              let dayThreeIcon = data2.daily[3].weather[0].icon;
              let iconurlThree =
                "http://openweathermap.org/img/w/" + dayThreeIcon + ".png";
              $("#wicon3").attr("src", iconurlThree);

              let dayFourDate = new Date(
                data2.daily[4].dt * 1000
              ).toLocaleDateString("en-Us");
              dayFourDateEl.append(dayFourDate);

              let dayFourTemp = data2.daily[4].temp.day;
              tempDayFourEl.append(dayFourTemp);

              let dayFourWindSpeed = data2.daily[4].wind_speed;
              windDayFourEl.append(dayFourWindSpeed);

              let dayFourHumidity = data2.daily[4].humidity;
              humdityDayFourEl.append(dayFourHumidity);

              let dayFourIcon = data2.daily[4].weather[0].icon;
              let iconurlFour =
                "http://openweathermap.org/img/w/" + dayFourIcon + ".png";
              $("#wicon4").attr("src", iconurlFour);
           
         });
        });  
        });
