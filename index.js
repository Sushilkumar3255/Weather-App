const API_KEY = `9f6acc5a5de7724c1555434874de6c48`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

const showLoader = () => {
    weather.innerHTML = "Loading...";
};

const showError = (msg) => {
    weather.innerHTML = msg;
};

const getWeather = async (city) => {
    try{
        showLoader();
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        return showWeather(data);
    }
    catch(err){
        console.log(err);
    }
};

const showWeather = (data) => {
    if (data.cod === "404"){
        const msg = "City Not Found"
        showError(msg);
        return;
    }
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" />
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h4> ${data.weather[0].main} </h4>
        </div>
        `;
};

form.addEventListener("submit", function(event) {
    getWeather(search.value);
    event.preventDefault();
});
