export const UI_ELEMENTS = {
    FORM_SEARCH : document.querySelector('.search-form'),
    INPUT_SEARCH : document.querySelector('.search__input'),
    WEATHER_TEMPERATURE : document.querySelector('.weather-now__temperature'),
    TITLES_CITY : document.querySelector('.title-city'),
    HEART_BTN : document.querySelector('.weather-now__btn'),
    TABS : document.querySelectorAll('.main-tabs__block'),
    TABS_BUTTONS : document.querySelectorAll('.main-tabs__item'),
    FAVORITE_CITIES : document.querySelector('.city-list')
}

export function showWeather(city,temp) {
    UI_ELEMENTS.TITLES_CITY.textContent = `${city}`;
    UI_ELEMENTS.WEATHER_TEMPERATURE.textContent = `${temp}°`;
}

