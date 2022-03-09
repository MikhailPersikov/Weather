import {UI_ELEMENTS} from "./view.js";
import {showWeather} from "./view.js";

const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';

UI_ELEMENTS.FORM_SEARCH.addEventListener('submit', getWeater);
UI_ELEMENTS.HEART_BTN.addEventListener('click', addFavoriteCity);
UI_ELEMENTS.HEART_BTN.addEventListener('click', pushLikeCity);

const favoriteCities = [];

function getWeater(event){
    event.preventDefault();
    const cityName = UI_ELEMENTS.INPUT_SEARCH.value
    const url = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`
    fetch(url)
        .then(response => response.json())
        .then(data => showWeather(data.name, getCelsius(data.main.temp)));
    UI_ELEMENTS.INPUT_SEARCH.value = '';
};

function getCelsius(temperature){
    return (temperature - 273).toFixed(0)
};

function pushLikeCity(){
    const currentCity = UI_ELEMENTS.TITLES_CITY.textContent;
    const addedCity = favoriteCities.includes(currentCity,0);

    if(addedCity) console.log('Error')
        else {
            favoriteCities.push(currentCity);
            showLikeCityOnDisplay();
    }
}

function showLikeCityOnDisplay(){
    console.log(favoriteCities);
    createCitiesLi();
    const favoriteCity = `${UI_ELEMENTS.TITLES_CITY.textContent}`
    UI_ELEMENTS.FAVORITE_CITIES.lastChild.textContent = favoriteCity;
}

function createCitiesLi(){
    console.log('working')
    console.log(UI_ELEMENTS.FAVORITE_CITIES.lastChild)
    // UI_ELEMENTS.FAVORITE_CITIES.lastChild.innerHTML = `
    //     <li class="city-list__item">
    //     Dane
    //     <button class="city-list__close-btn">x</button>
    // </li>
    // `
    const li = document.createElement('li');
    li.className = 'city-list__item1';
    const button = document.createElement('button');
    button.className = 'city-list__close-btn';    
    UI_ELEMENTS.FAVORITE_CITIES.append(li);
    console.log(UI_ELEMENTS.FAVORITE_CITIES.firstChild,'debug');
    UI_ELEMENTS.FAVORITE_CITIES.firstChild.append(button);
}

function addFavoriteCity(){
    UI_ELEMENTS.HEART_BTN.classList.toggle('active-heard');
}

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

// UI_ELEMENTS.TABS_BUTTONS.forEach(tabs => {
//     tabs.addaddEventListener('click', () => {
//         const idForTab = tabs.getAttribute('href')
//         const currentTab = document.querySelector(idForTab)

//         DeleteActiveClassesTabs()

//         currentTab.classList.add('main-tabs__block--active')
//         tabs.classList.add('main-tabs__item--active')
//     })
// });



