const input = document.querySelector("input");
const btn = document.querySelector(".search-btn");

const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const weatherIcon = document.querySelector(".weather-icon");

const api_key = "e53cd4f96286210beb6c2411ffcabe9c"; // Replace with your API key

async function checkWeather(cityName) {
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;

  try {
    const response = await fetch(api_url);
    if (!response.ok) {
      throw new Error("City not found or network error");
    }

    const data = await response.json();
    city.innerText = data.name;
    temp.innerText = Math.round(data.main.temp) + "°C";
    humidity.innerText = data.main.humidity + "%";
    wind.innerText = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
    }
    console.log(data);
  } catch (error) {
    console.error(error);
    city.innerText = "City not found";
    temp.innerText = "";
    humidity.innerText = "";
    wind.innerText = "";
  }
}

btn.addEventListener("click", () => {
  const cityName = input.value; // Get the latest input value
  if (cityName) {
    checkWeather(cityName);
  } else {
    alert("Please enter a city name");
  }
});
