// const weatherIMG = $("#weather_data img")
// const windSpeed = $("#windSpeed span")
// const realFeel = $("#realFeel span")
// const humidity = $("#humidity span")
// const cloudOver = $("#cloudOver span")
// const weatherStatus = $("#weatherStatus span")
// const temperature = $("#temperature span")
// const search = $("#search input")
// const searchBtn = $("#search button")
// const leftArrow = $("#left")
// const rightArrow = $("#right")
// const weekDay = $("#day")
// const theDate = $("#weekDay p")
// console.log(weatherIMG.attr("alt"));
// let day = 0
// let weatherData = null;

// async function fetchStatus() {
//     if (!weatherData) return;

//     try {
//         const response = await fetch("./weatherStatus.json")
//         const data = await response.json()
//         const dailyWeather = weatherData.days[day].icon
//         console.log("Weather Icon Code:", dailyWeather);

//         const match = data.find(element => element.id === dailyWeather) 
        
//         if (match) {
//             weatherIMG.attr("src", match.url);
//             console.log("Matched Icon:", match.id);
//         }else {
//             console.warn("No matching icon found");
//         }
//     } catch {
//         console.log("Error fetching weather status");
//     }
// }




// $(searchBtn).click(async (e) =>{ 
//     const searchValue = search.val();
//     e.preventDefault();
//     if (!searchValue) return;
//     console.log(searchValue);
//     // getWeatherData(searchValue);
//     await getWeatherData(searchValue);
// });

// function switchDays() {
//     $(leftArrow).click(() => {
//         if (day > 0) {  // Prevent going before available data
//             // console.log("object");
//             day--;
//             updateWeatherDisplay();
//             console.log(day);
//         }
//     });
//     $(rightArrow).click(() =>{
//         if (weatherData && day < weatherData.days.length - 1) {  // Prevent going beyond available data
//             day++;
//             console.log(day);
//             updateWeatherDisplay();
//         }
//     })
// }

// async function getWeatherData(city) {
//     const key = "4YRUE4WF8UP7CK9L7BLFJK3PT"
//     const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/?key=${key}`
//     try{
//         const response =  await fetch(url)
//         weatherData = await response.json()
//         console.log(weatherData);
//         day = 0; // Reset to today
//         updateWeatherDisplay()
//         // fetchStatus()

//     }
//     catch (error) {

//         console.error("Error fetching weather:", error);

//     }
// }

// function updateWeatherDisplay() {
//     if (!weatherData) return;
//     const dailyWeather = weatherData.days[day]
//     const dateString = dailyWeather.datetime;
//     const date = new Date(dateString);
//     const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    
//     $(windSpeed).text(dailyWeather.windspeed)
//     $(humidity).text(dailyWeather.humidity);
//     $(cloudOver).text(dailyWeather.cloudcover);
//     $(weatherStatus).text(dailyWeather.conditions);
//     $(temperature).text(dailyWeather.temp);
//     $(realFeel).text(dailyWeather.feelslike);
//     $(theDate).text(dateString)
//     // console.log(day);
//     fetchStatus()
    
//     switch(day) {
//         case 0:
//             $(weekDay).text("Today");
//             console.log("Today");
//             break;
//         case 1:
//             $(weekDay).text("Tomorrow");
//             console.log("Tomorrow");
//             break;
//         default: $(weekDay).text(dayOfWeek)
//     }
// }


// switchDays();