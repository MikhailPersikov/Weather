export const UI_ELEMENTS = {
    FORM_SEARCH : document.querySelector('.search-form'),
    INPUT_SEARCH : document.querySelector('.search__input'),
    WEATHER_TEMPERATURE : document.querySelector('.weather-now__temperature'),
    TITLES_CITY_NOW : document.querySelector('.title-city-now'),
    TITLES_CITY_DETAILS : document.querySelector('.weather-details__title'),
    TITLES_CITY_FORECAST : document.querySelector('.weather-forecast__title'),
    HEART_BTN : document.querySelector('.weather-now__btn'),
    TABS : document.querySelectorAll('.main-tabs__block'),
    TABS_BUTTONS : document.querySelectorAll('.main-tabs__item'),
    FAVORITE_CITIES : document.querySelector('.city-list')
}

export function showWeather(object) {
    UI_ELEMENTS.TITLES_CITY_NOW.textContent = `${object.name}`;
    UI_ELEMENTS.TITLES_CITY_DETAILS.textContent = `${object.name}`;
    UI_ELEMENTS.TITLES_CITY_FORECAST.textContent = `${object.name}`;

    UI_ELEMENTS.WEATHER_TEMPERATURE.textContent = `${(object.temp - 273).toFixed(0)}°`;
}
