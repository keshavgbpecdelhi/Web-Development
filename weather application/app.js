const apiKey = "57bf1cf1da91d697a649254e4cb64cba";

// Displaying date
let today = new Date();
let options = {
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
};
let day = today.toLocaleDateString("en-US", options);
// console.log(day);


const displayDay = document.getElementById("date");
displayDay.innerHTML = day;

//function to get input from the user and checking if location is found.
function getWeather() {
  const locationInput = document.getElementById("locationInput");
  const location = locationInput.value.trim();

  if (!location) {
    alert(
      "Sorry, we could not able to find Your location right now. Please retry later ;)."
    );
    return;
  }
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  //function to get weather info
  getWeatherDetails(apiUrl);
}

//display weather by using auto detecting the user location
function currentLocationweather() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Constructing the API URL
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
        getWeatherDetails(apiUrl);
      },
      function (error) {
        console.error("Error getting location:", error);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}
function getWeatherDetails(apiUrl) {
  fetch(apiUrl)
    //parsing the json
    .then((response) => response.json())
    .then(function (data) {
      //function  to display the weather in the weatherinfo div
      displayWeather(data);
    })
    //handling the errors
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert(
        "Sorry, we could not able to find Your location right now. Please retry later ;)"
      );
    });
}

//sends the weahter data to the weahterInfo div  using the data from the json
function displayWeather(data) {
  const weatherInfoDiv = document.getElementById("weatherInfo");
  weatherInfoDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <h3>Temperature: ${data.main.temp}°C</h3>
    <p>Max temperature : ${data.main.temp_max}</p>
    <p>Min temperature : ${data.main.temp_min}</p>
    <p>Description: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

//code for displaying random quotes

let quotes = [`Anyone who says sunshine brings happiness has never danced in the rain.`,
`Life isn’t about waiting for the storm to pass — it’s about learning to dance in the rain.`,
`The rain cools the air, calms the soul and replenishes life. – Mike Dolan`,
`I like people who smile when it’s raining.`,
`Tears of joy are like the summer rain drops pierced by sunbeams. – Hosea Ballou`,
`Some people feel the rain — others just get wet. – Roger Miller`,
`It’s better to go out and dance in the rain than to stay inside under a leaky roof. – Vance L. Wisen`,
`Kindness is like snow. It beautifies everything it covers. – Kahlil Gibran`,
`Dark clouds become heaven’s flowers when kissed by light. – Rabindranath Tagore`,
`There’s no such thing as good weather, or bad weather. There’s just weather and your attitude towards it. – Louise Hay`,
`Rise above the storm and you will find the sunshine. – Mario Fernández`]

let randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
document.querySelector('#quote').innerText=randomQuote













// const backgroundAudio = document.getElementById("backgroundAudio");
// const playPauseButton = document.getElementById("playPauseButton");

// // Event listener for the button click
// playPauseButton.addEventListener("click", togglePlayPause);

// // Function to toggle play and pause
// function togglePlayPause() {
//   if (backgroundAudio.paused) {
//     backgroundAudio.play();
//     playPauseButton.innerHTML = "<i class='fa-solid fa-pause'></i>";
//   } else {
//     backgroundAudio.pause();
//     playPauseButton.innerHTML = "<i class='fa-solid fa-play'></i>";
//   }
// }


