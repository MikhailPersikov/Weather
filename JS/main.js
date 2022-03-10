import {UI_ELEMENTS} from "./view.js";
import {showWeather} from "./view.js";

// showWeather(data.name, getCelsius(data.main.temp))

const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';

UI_ELEMENTS.FORM_SEARCH.addEventListener('submit', getWeather);
UI_ELEMENTS.HEART_BTN.addEventListener('click', addFavoriteCity);
UI_ELEMENTS.HEART_BTN.addEventListener('click', pushLikeCity);

const favoriteCities = [];

function getWeather(event){
    event.preventDefault();
    const cityName = UI_ELEMENTS.INPUT_SEARCH.value
    // const favoriteCity = currentCity;
    // ? or if
    const URL = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`
    fetch(URL)
        .then(response => response.json())
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
        })
        .catch((error)=> alert(error))
    UI_ELEMENTS.INPUT_SEARCH.value = '';
};

function getWeatherF(currentCity){
    console.log('working');
    const favoriteCity = currentCity;
    const url = `${SERVER_URL}?q=${favoriteCity}&appid=${API_KEY}`
    fetch(url)
        .then(response => response.json())
        .then(data => showWeather(data.name, getCelsius(data.main.temp)));
}

function pushLikeCity(){
    const currentCity = UI_ELEMENTS.TITLES_CITY_NOW.textContent;
    const addedCity = favoriteCities.includes(currentCity,0);

    if(addedCity) console.log('Error')
        else {
            favoriteCities.push(currentCity);
            showLikeCityOnDisplay();
    }
}

function showLikeCityOnDisplay(){
    console.log(favoriteCities)
    const currentCity = UI_ELEMENTS.TITLES_CITY_NOW.textContent;

    const li = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'city-list__close-btn';    
    li.className = 'city-list__item';
    li.textContent = currentCity;
    li.append(button);
    UI_ELEMENTS.FAVORITE_CITIES.append(li);

    button.addEventListener('click',()=> {
        const findedCity = favoriteCities.findIndex(item => item === currentCity);
        favoriteCities.splice(findedCity, 1);
        li.remove();
    });
    
    li.onclick = () => {
        getWeatherF(li.textContent);
    }
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



