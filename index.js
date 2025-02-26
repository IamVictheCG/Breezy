const weatherIMG = $("#weather_data img")
const windSpeed = $("#windSpeed span")
const realFeel = $("#realFeel span")
const humidity = $("#humidity span")
const fullAddress = $("#fullAddress span")
const cloudOver = $("#cloudOver span")
const weatherStatus = $("#weatherStatus span")
const temperature = $("#temperature span")
const search = $("#search input")
const searchBlock = $("#search")
const weatherDataBlock = $("#weather_data")
const searchBtn = $("#search button")
const leftArrow = $("#left")
const rightArrow = $("#right")
const weekDay = $("#day")
const theDate = $("#weekDay p")
console.log(weatherIMG.attr("alt"));
let day = 0
let weatherData = null;

async function getWeatherData(city) {
    const key = "4YRUE4WF8UP7CK9L7BLFJK3PT"
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/?key=${key}`
    try{
        const response =  await fetch(url)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        weatherData = await response.json()
        $('.loader').css('display','none')
        $("#error").css("display", "none")
        console.log(weatherData);
        $(weatherDataBlock).css('display','grid')
        $('html, body').animate({
            scrollTop: $(weatherDataBlock).offset().top
        });
        day = 0; // Reset to today
        updateWeatherDisplay()
        switchDays();
        // fetchStatus()

    }
    catch (error) {
        error.message = "Location must be a real place"
        $("#error").css("display", "block")
        $('.loader').css('display','none')
        $("#error").text(error.message)
        console.error("Error fetching weather:", error.message);

    }
}

async function fetchStatus() {
    if (!weatherData || !weatherData.days[day]) return;

    try {
        const response = await fetch("./weatherStatus.json")
        const data = await response.json()
        const dailyWeather = weatherData.days[day].icon
        console.log("Weather Icon Code:", dailyWeather);

        const match = data.find(element => element.id === dailyWeather) 
        
        if (match) {
            weatherIMG.attr("src", match.url);
            console.log("Matched Icon:", match.id);
        }else {
            console.warn("No matching icon found");
        }
    } catch {
        console.log("Error fetching weather status");
    }
}

$(searchBtn).click(async (e) =>{ 
    const searchValue = search.val();
    e.preventDefault();
    if (!searchValue) return;

    console.log(searchValue);
    $('.loader').css('display','flex')
    $("#error").css("display", "none")
    // getWeatherData(searchValue);
    await getWeatherData(searchValue);
});

function switchDays() {
    if (!weatherData || !weatherData.days) return;

    const searchValue = search.val();
    console.log(day);

    console.log(searchValue);

    if (searchValue) {
        $(leftArrow).off().on("mousedown", function () {
            $(this).css("color", "#00eaff   ");
        }).on("mouseup mouseleave", function () {
            $(this).css("color", "white");
        }).on("click", function () {
            console.log("Left arrow clicked");
            console.log(leftArrow);
            if (day > 0) {
                day--;
                updateWeatherDisplay();
                console.log("Updated day:", day);
            }
        });
    
        $(rightArrow).off().on("mousedown", function () {
            $(this).css("color", "#00eaff   ");
        }).on("mouseup mouseleave", function () {
            $(this).css("color", "white");
        }).on("click", function () {
            console.log("Right arrow clicked");
            if (day < weatherData.days.length - 1) {
                day++;
                updateWeatherDisplay();
                console.log("Updated day:", day);
            }
        });
        updateArrowState()

    } else {
        console.log("No search value");
        $(leftArrow).off().css("opacity", "1");
        $(rightArrow).off().css("opacity", "1");
    }
}

function updateArrowState() {
    if (!weatherData || !weatherData.days) return;
    
    if (day === 0) {
        $(leftArrow).css("opacity", "0.5");
    } else {
        $(leftArrow).css("opacity", "1");
    }

    if (day === weatherData.days.length - 1) {
        $(rightArrow).css("opacity", "0.5");
    } else {
        $(rightArrow).css("opacity", "1");
    }
}

function updateWeatherDisplay() {
    if (!weatherData) return;
    const dailyWeather = weatherData.days[day]
    const place = weatherData.address
    const dateString = dailyWeather.datetime;
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    
    $(windSpeed).text(`${dailyWeather.windspeed}km/h`)
    $(humidity).text(`${dailyWeather.humidity}%`);
    $(cloudOver).text(`${dailyWeather.cloudcover}%`);
    $(weatherStatus).text(`${dailyWeather.conditions}`);
    $(temperature).text(`${dailyWeather.temp}°C`);
    $(realFeel).text(`${dailyWeather.feelslike}°C`);
    $(fullAddress).text(weatherData.resolvedAddress);
    $(theDate).text(dateString)
    // console.log(day);
    fetchStatus()
    
    switch(day) {
        case 0:
            $(weekDay).text(`Today at ${place}`);
            console.log("Today");
            break;
        case 1:
            $(weekDay).text(`Tomorrow at ${place}`);
            console.log("Tomorrow");
            break;
        default: $(weekDay).text(`${dayOfWeek} at ${place}`)
    }

    updateArrowState();
}


