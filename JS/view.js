export const UI_ELEMENTS = {
    FORM_SEARCH: document.querySelector('.search-form'),
    INPUT_SEARCH: document.querySelector('.search__input'),
    NOW_TEMPERATURE: document.querySelector('.weather-now__temperature'),
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

export function showWeather(object) {
    UI_ELEMENTS.TITLES_CITY_NOW.textContent = `${object.name}`;
    UI_ELEMENTS.TITLES_CITY_DETAILS.textContent = `${object.name}`;
    UI_ELEMENTS.TITLES_CITY_FORECAST.textContent = `${object.name}`;

    UI_ELEMENTS.NOW_TEMPERATURE.textContent = `${(object.temp - 273).toFixed(0)}°`;
    UI_ELEMENTS.DETAILS_TEMPERATURE.textContent = `${(object.temp - 273).toFixed(0)}°`;
    UI_ELEMENTS.DETAILS_FEELS_LIKE.textContent = `${(object.feels_like -273).toFixed(0)}°`;
    UI_ELEMENTS.DETAILS_WEATHER.textContent = `${object.weather}`;

    const sunrise = new Date(object.sunrise * 1000);
    const sunset = new Date(object.sunset * 1000);

    UI_ELEMENTS.DETAILS_SUNRISE.textContent = `${sunrise.getHours()}:${sunrise.getMinutes()}`;
    UI_ELEMENTS.DETAILS_SUNSET.textContent = `${sunset.getHours()}:${sunset.getHours()}`;
}

export function showForcast(arr) {
    const date = new Date(arr[0].dt * 1000)
    console.log(arr[0].main.temp)
    const UL = UI_ELEMENTS.FORECAST_LIST;
    if (UL.length !== 0) UL.childNodes.forEach(li => li.remove())
    
    for (let i = 0; i < arr.length; i++) {
        UL.innerHTML += `
        <li class="weather-forecast__list-item">
            <div class="weather-forecast__top">
                <p class="weather-forecast__text">${date.getMonth()}.${date.getFullYear()} </p>
                <p class="weather-forecast__text">${date.getHours()}:${date.getMinutes()}</p>
                </div>
                <div class="weather-forecast__bottom">
                <div class="weather-forecast__parameters">
                <p class="weather-forecast__text"> Temperature: ${Math.round(arr[i].main.temp)}°</p>
                <p class="weather-forecast__text"> Feels like: ${Math.round(arr[i].main.feels_like)}°</p>
                </div>
                <div class="weather-forecast__precipitation">
                <p class="weather-forecast__text"> ${arr[i].weather[0].main}</p>
                <img src="./img/rain.png" alt="weather icon" class="weather-forecast__img">
                </div>
            </div>
        </li> 
        `
    }
        console.log( UI_ELEMENTS.FORECAST_LIST.childNodes,'debug')
    }


export function removeCity(element){
    const thisCity = element.parentElement.textContent;
    const finedCity = favoriteCities.indexOf(thisCity)
    favoriteCities.splice(finedCity,1);
    UI_ELEMENTS.HEART_BTN.classList.remove('active-heard');
    element.parentElement.remove();      
};

// console.log(UI_ELEMENTS.FORECAST_LIST.childNodes)