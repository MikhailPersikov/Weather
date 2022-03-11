import {UI_ELEMENTS} from "./view.js";
import {showWeather} from "./view.js";

UI_ELEMENTS.FORM_SEARCH.addEventListener('submit', getWeather);
UI_ELEMENTS.HEART_BTN.addEventListener('click', addFavoriteCity);

const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';

const favoriteCities = [];

function getWeather(){
    UI_ELEMENTS.HEART_BTN.classList.remove('active-heard');
    let cityName;
    const formValue = UI_ELEMENTS.INPUT_SEARCH.value;
    formValue ? cityName = formValue : cityName = this.textContent;
    const URL = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`;
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
        })
        .catch((error)=> alert(error))
    UI_ELEMENTS.INPUT_SEARCH.value = '';
};

function addFavoriteCity(){
    UI_ELEMENTS.HEART_BTN.classList.toggle('active-heard');
    const active = UI_ELEMENTS.HEART_BTN.className;
    console.log(active);
    const currentCity = UI_ELEMENTS.TITLES_CITY_NOW.textContent;
    const addedCity = favoriteCities.includes(currentCity,0);

    if(addedCity) {
        console.log('Error. This city is in favorite cities'); 
        let test = document.querySelectorAll('.city-list__close-btn')
        test.forEach(element =>{
        console.log(element)
          if (true) removeCity();
      })
    }else {
        favoriteCities.push(currentCity);
        createElementForCity();
    }
}

function createElementForCity(){
    console.log(favoriteCities)
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'city-list__close-btn';    
    li.className = 'city-list__item';
    li.textContent = UI_ELEMENTS.TITLES_CITY_NOW.textContent;
    li.append(button);
    UI_ELEMENTS.FAVORITE_CITIES.append(li);

    button.addEventListener('click', removeCity) 
    li.addEventListener('click', getWeather)
}

function removeCity(){
        console.log(this)
        const thisCity = this.parentElement.textContent;
        const finedCity = favoriteCities.indexOf(thisCity)
        favoriteCities.splice(finedCity,1);
        UI_ELEMENTS.HEART_BTN.classList.remove('active-heard');
        this.parentElement.remove();      
};










// ----------------------------------------TABS----------------------------------------------


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



