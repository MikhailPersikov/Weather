import {favoriteCities} from "./main.js";

export function addCityToStorage(){
    let sityId = favoriteCities.length -1
    localStorage.setItem(sityId,JSON.stringify(favoriteCities.at(-1))); 
}

