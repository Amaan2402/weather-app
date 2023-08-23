    let userInput = document.querySelector(".user-input");
    let searchBtn = document.querySelector(".search-btn");
    let cityNameDisplay = document.querySelector(".city");
    let humidityDisplay = document.querySelector(".humidity-text");
    let windSpeedDisplay = document.querySelector(".wind-speed-text")
    let weatherImg = document.querySelector("#weather-img");

    let apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    let apiKey = "96e7e4bf3ae58af91fe9a6b7ccb4448f";

    let locationDegree = document.querySelector(".degree");
    let weatherData;

    async function getWeatherData() {
        try {
            let cityName = await userInput.value;
            let city = `${cityName}&appid=`
            let finalurl = (apiUrl+city+apiKey);
            weatherData = await axios.get(finalurl);
            console.log(weatherData);
            console.log(cityName);
        } catch (error) {
            console.log(error);
        }
    };

    searchBtn.addEventListener("click", async ()=> {
        if (!userInput.value) {
            alert("Please enter a city name.");
            return; // Stop further execution
        };

        await getWeatherData();
        await getWeatherInfo();
    });

    async function getWeatherInfo () {
        let finalDegree = weatherData.data.main.temp;
        locationDegree.innerHTML = `${finalDegree} &deg;c`;

        cityNameDisplay.innerText = userInput.value;

        let finalHumidity = weatherData.data.main.humidity;
        humidityDisplay.innerText = `${finalHumidity}%`

        let finalWindSpeed = weatherData.data.wind.speed;
        windSpeedDisplay.innerText = `${finalWindSpeed} km/h`

        let imgData = await weatherData.data.weather[0].main;
        console.log(imgData);
        userInput.value= "";

        if(imgData == "Clouds"){
            weatherImg.src = "./images/clouds.png";
        } else if(imgData == "Clear"){
            weatherImg.src = "./images/clear.png"
        } else if(imgData == "Drizzle"){
            weatherImg.src = "./images/drizzle.png"
        } else if (imgData == "Rain") {
            weatherImg.src = "./images/rain.png" 
        } else if (imgData == "Snow") {
            weatherImg.src = "./images/snow.png"
        } else if (imgData == "Mist") {
            weatherImg.src = "./images/mist.png"
        };
    };