import { weather_ids, weather_ids_kr } from './Entities.js';

function weatherKorean(data) {
    const weatherId = data.weather[0].id;

    for (let i = 0; i < weather_ids.length; i++) {
        if (weather_ids[i] === weatherId) {
            return weather_ids_kr[i];
        }
    }
}

export default weatherKorean;