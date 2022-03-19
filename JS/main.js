import {UI_ELEMENTS,showWeather,showForecast,addFavoriteCity} from "./view.js";

UI_ELEMENTS.FORM_SEARCH.addEventListener('submit', getWeather);
UI_ELEMENTS.HEART_BTN.addEventListener('click', addFavoriteCity);

const SERVER_URL_NOW = 'https://api.openweathermap.org/data/2.5/weather';
const SERVER_URL_FORCAST = 'https://api.openweathermap.org/data/2.5/forecast'
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';
const CELSIUS = 'units=metric';
const FORECAST_PERIOD = 'cnt=7';
export const IMAGES_URL = 'https://openweathermap.org/img/wn/'

export const favoriteCities = [];

export function getWeather(){
    const formValue = UI_ELEMENTS.INPUT_SEARCH.value;
    const cityName =  formValue || this.textContent;
    const URL = `${SERVER_URL_NOW}?q=${cityName}&appid=${API_KEY}&${CELSIUS}`;
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            const weatherObject = {
                name: data.name,
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                weather: data.weather[0].main,
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset,
                icon:data.weather[0].icon,
            };
            showWeather(weatherObject);
            getForecast(cityName);
        })
        .catch((error)=> {
            alert(error)
            UI_ELEMENTS.INPUT_SEARCH.value = '';
        })
};

export function getForecast(cityName){
    const URL = `${SERVER_URL_FORCAST}?q=${cityName}&appid=${API_KEY}&${FORECAST_PERIOD}&${CELSIUS}`;
    fetch(URL)
        .then(resp => resp.json())
        .then(data => {
            let arrayWeather = [];
            arrayWeather = arrayWeather.concat(data.list);
            // arrayWeather = [...data.list]
            showForecast(arrayWeather);
        })
    UI_ELEMENTS.INPUT_SEARCH.value = '';
    const finedCity = favoriteCities.find(item => item === cityName)
    if(!finedCity) UI_ELEMENTS.HEART_BTN.classList.remove('active-heard')
}
