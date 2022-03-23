import {favoriteCities,getWeather,IMAGES_URL} from "./main.js";
import { addCityToStorage } from "./storage.js";

export const UI_ELEMENTS = {
    FORM_SEARCH: document.querySelector('.search-form'),
    INPUT_SEARCH: document.querySelector('.search__input'),
    NOW_TEMPERATURE: document.querySelector('.weather-now__temperature'),
    NOW_WEATHER: document.querySelector('.weather-now__img'),
    TITLES_CITY_NOW: document.querySelector('.title-city-now'),
    TITLES_CITY_DETAILS: document.querySelector('.weather-details__title'),
    TITLES_CITY_FORECAST: document.querySelector('.weather-forecast__title'),
    HEART_BTN: document.querySelector('.weather-now__btn'),
    TABS: document.querySelectorAll('.main-tabs__block'),
    TABS_BUTTONS: document.querySelectorAll('.main-tabs__item'),
    FAVORITE_CITIES: document.querySelector('.city-list'),
    DETAILS_TEMPERATURE: document.querySelector('.temperature'),
    DETAILS_FEELS_LIKE: document.querySelector('.feels_like'),
    DETAILS_WEATHER: document.querySelector('.weather'),
    DETAILS_SUNRISE: document.querySelector('.sunrise'),
    DETAILS_SUNSET: document.querySelector('.sunset'),
    FORECAST_LIST: document.querySelector('.weather-forecast__list'),
}

export function showWeather(objectWeather){
    const cityName = objectWeather.name;
    const cityTemperature = objectWeather.temp.toFixed(0);
    const citySunrise = objectWeather.sunrise;
    const citySunset = objectWeather.sunset;
    const cityFeelslike = objectWeather.feels_like.toFixed(0);
    const cityWeather = objectWeather.weather;
    const cityIcon = objectWeather.icon

    UI_ELEMENTS.TITLES_CITY_NOW.textContent = `${cityName}`;
    UI_ELEMENTS.TITLES_CITY_DETAILS.textContent = `${cityName}`;
    UI_ELEMENTS.TITLES_CITY_FORECAST.textContent = `${cityName}`;

    UI_ELEMENTS.NOW_WEATHER.setAttribute('src',`${IMAGES_URL}${cityIcon}@4x.png`)
    UI_ELEMENTS.NOW_TEMPERATURE.textContent = `${cityTemperature}°`;
    UI_ELEMENTS.DETAILS_TEMPERATURE.textContent = `${cityTemperature}°`;
    UI_ELEMENTS.DETAILS_FEELS_LIKE.textContent = `${cityFeelslike}°`;
    UI_ELEMENTS.DETAILS_WEATHER.textContent = `${cityWeather}`;

    UI_ELEMENTS.DETAILS_SUNRISE.textContent = `${convertTime(citySunrise)}`;
    UI_ELEMENTS.DETAILS_SUNSET.textContent = `${convertTime(citySunset)}`;
}

export function showForecast(arrayWeather){
    UI_ELEMENTS.FORECAST_LIST.innerHTML = '';

    arrayWeather.forEach((city,index) => {

        const date = city.dt;
        const cityTemperature = Math.round(arrayWeather[index].main.temp);
        const cityFeelslike = Math.round(arrayWeather[index].main.feels_like);
        const cityWeather = city.weather[0].main;
        const cityIcon = city.weather[0].icon;

        UI_ELEMENTS.FORECAST_LIST.innerHTML += `
        <li class="weather-forecast__list-item">
            <div class="weather-forecast__top">
                <p class="weather-forecast__text">${convertDate(date)}</p>
                <p class="weather-forecast__text">${convertTime(date)}</p>
                </div>
                <div class="weather-forecast__bottom">
                <div class="weather-forecast__parameters">
                <p class="weather-forecast__text"> Temperature: ${cityTemperature}°</p>
                <p class="weather-forecast__text"> Feels like: ${cityFeelslike}°</p>
                </div>
                <div class="weather-forecast__precipitation">
                <p class="weather-forecast__text"> ${cityWeather}</p>
                <img src="${IMAGES_URL}${cityIcon}.png" alt="weather icon" class="weather-forecast__img">
                </div>
            </div>
        </li> 
        `
    }) 
}

export function addFavoriteCity(){
    UI_ELEMENTS.HEART_BTN.classList.toggle('active-heard');
    
    const currentCity = UI_ELEMENTS.TITLES_CITY_NOW.textContent;
    const addedCity = favoriteCities.includes(currentCity,0);
    
    if (addedCity) {
        const closeButtons = document.querySelectorAll('.city-list__close-btn')
        let arrayCloseButtons = Array.from(closeButtons)
        .find(el => el.parentElement.textContent === currentCity)     
        if (arrayCloseButtons) removeCity(arrayCloseButtons);
        console.log(arrayCloseButtons)

    } else {
        favoriteCities.push(currentCity);
        addCityToStorage();
        createElementForCity();
    }
}

export function removeCity(element){
    const thisCity = element.parentElement.textContent;
    const foundCity = favoriteCities.indexOf(thisCity)
    favoriteCities.splice(foundCity,1);
    localStorage.removeItem(foundCity)
    UI_ELEMENTS.HEART_BTN.classList.remove('active-heard');
    element.parentElement.remove();   
    console.log(favoriteCities)   
};

export function createElementForCity(){
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'city-list__close-btn';    
    li.className = 'city-list__item';
    li.textContent = UI_ELEMENTS.TITLES_CITY_NOW.textContent;
    li.append(button);
    UI_ELEMENTS.FAVORITE_CITIES.append(li);
    
    button.addEventListener('click', (e)=> removeCity(e.target)) 
    li.addEventListener('click', getWeather)
    li.onclick = ()=> {
        UI_ELEMENTS.HEART_BTN.classList.add('active-heard')
    }
}

export function createElementStorage(city){
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'city-list__close-btn';    
    li.className = 'city-list__item';
    li.textContent = city
    li.append(button);
    UI_ELEMENTS.FAVORITE_CITIES.append(li);
    
    button.addEventListener('click', (e)=> removeCity(e.target)) 
    li.addEventListener('click', getWeather)
    li.onclick = ()=> {
        UI_ELEMENTS.HEART_BTN.classList.add('active-heard')
    }
}

function convertTime(ms){
     return new Date( ms * 1000).toLocaleTimeString('en-GB', {
        hour: 'numeric',
        minute: 'numeric'
      })
}

function convertDate(date){
    return new Date(date * 1000).toLocaleDateString('en-GB', {
        month: 'short',
        day: '2-digit',
      })
}

//-----------------------------------TABS-----------------------------------------

function DeleteActiveClassesTabs() {
    UI_ELEMENTS.TABS.forEach(tab => tab.classList.remove('main-tabs__block--active'))
    UI_ELEMENTS.TABS_BUTTONS.forEach(tabBtn => tabBtn.classList.remove('main-tabs__item--active'))
}

for (const tabBtn of UI_ELEMENTS.TABS_BUTTONS){
    tabBtn.addEventListener('click', () => {
        const idForTab = tabBtn.getAttribute('href')
        const currentTab = document.querySelector(idForTab)

        DeleteActiveClassesTabs()

        currentTab.classList.add('main-tabs__block--active')
        tabBtn.classList.add('main-tabs__item--active')
    })
}
