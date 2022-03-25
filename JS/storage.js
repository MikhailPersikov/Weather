import {favoriteCities,getWeather} from "./main.js";
import { UI_ELEMENTS } from "./view.js";

export function addCityToStorage(){
    let sityId = favoriteCities.length -1
    localStorage.setItem(sityId,JSON.stringify(favoriteCities.at(-1))); 
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

