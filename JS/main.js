import {UI_ELEMENTS} from "./view.js";
import {showWeather} from "./view.js";
import {showForcast} from "./view.js";
import {addFavoriteCity} from "./view.js";

UI_ELEMENTS.FORM_SEARCH.addEventListener('submit', getWeather);
UI_ELEMENTS.HEART_BTN.addEventListener('click', addFavoriteCity);

const SERVER_URL_NOW = 'https://api.openweathermap.org/data/2.5/weather';
const SERVER_URL_FORCAST = 'https://api.openweathermap.org/data/2.5/forecast'
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';

export const favoriteCities = [];

export function getWeather(){
    let cityName;
    const formValue = UI_ELEMENTS.INPUT_SEARCH.value;
    formValue ? cityName = formValue : cityName = this.textContent;
    const URL = `${SERVER_URL_NOW}?q=${cityName}&appid=${API_KEY}&units=metric`;
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
            getForcast(cityName);
        })
        .catch((error)=> {
            alert(error)
            UI_ELEMENTS.INPUT_SEARCH.value = '';
        })
};

export function getForcast(cityName){
    const URL = `${SERVER_URL_FORCAST}?q=${cityName}&appid=${API_KEY}&cnt=7&units=metric`;
    fetch(URL)
        .then(resp => resp.json())
        .then(data => {
            let arr = [];
            arr = arr.concat(data.list);
            showForcast(arr);
        })
    UI_ELEMENTS.INPUT_SEARCH.value = '';
    const finedCity = favoriteCities.find(item => item === cityName)
    if(finedCity === undefined) UI_ELEMENTS.HEART_BTN.classList.remove('active-heard')
}
