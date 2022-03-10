export const UI_ELEMENTS = {
    FORM_SEARCH : document.querySelector('.search-form'),
    INPUT_SEARCH : document.querySelector('.search__input'),
    NOW_TEMPERATURE : document.querySelector('.weather-now__temperature'),
    TITLES_CITY_NOW : document.querySelector('.title-city-now'),
    TITLES_CITY_DETAILS : document.querySelector('.weather-details__title'),
    TITLES_CITY_FORECAST : document.querySelector('.weather-forecast__title'),
    HEART_BTN : document.querySelector('.weather-now__btn'),
    TABS : document.querySelectorAll('.main-tabs__block'),
    TABS_BUTTONS : document.querySelectorAll('.main-tabs__item'),
    FAVORITE_CITIES : document.querySelector('.city-list'),
    DETAILS_TEMPERATURE : document.querySelector('.temperature'),
    DETAILS_FEELS_LIKE : document.querySelector('.feels_like'),
    DETAILS_WEATHER : document.querySelector('.weather'),
    DETAILS_SUNRISE : document.querySelector('.sunrise'),
    DETAILS_SUNSET : document.querySelector('sunset'),
}

export function showWeather(object) {
    UI_ELEMENTS.TITLES_CITY_NOW.textContent = `${object.name}`;
    UI_ELEMENTS.TITLES_CITY_DETAILS.textContent = `${object.name}`;
    UI_ELEMENTS.TITLES_CITY_FORECAST.textContent = `${object.name}`;

    UI_ELEMENTS.NOW_TEMPERATURE.textContent = `${(object.temp - 273).toFixed(0)}°`;
    UI_ELEMENTS.DETAILS_TEMPERATURE.textContent = `${(object.temp - 273).toFixed(0)}°`;
    UI_ELEMENTS.DETAILS_FEELS_LIKE.textContent = `${(object.feels_like -273).toFixed(0)}°`;
}
