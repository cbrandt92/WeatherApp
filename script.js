function formatDate(date) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minute = currentTime.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentTime.getDay()];

  return `${day} ${hours}:${minute}`;
}
let currentTime = new Date();
let dateElement = document.querySelector("h3");
dateElement.innerHTML = formatDate(dateElement);

//Search Engine//
function searchCity(city) {
  let apiKey = "0f6d09ba1de0d63bb6966c01fe981fe1";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(displayWeather);
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//Enter City //

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "0f6d09ba1de0d63bb6966c01fe981fe1";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showWeather);
}

function showWeather(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  alert(`It is currently ${temperature}°C in ${currentCity}`);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentTemperatureButton = document.querySelector("button");
currentTemperatureButton.addEventListener("click", getPosition);
