import { krLocation, enLocation } from './Entities.js';
import getWeatherByLocation from './getWeatherByLocation.js';

function exchangeLang(city) {
    for (let i = 0; i < enLocation.length; i++) {
        if (krLocation[i] == city) {
            getWeatherByLocation(enLocation[i]);
        }
    }
}

export default exchangeLang;