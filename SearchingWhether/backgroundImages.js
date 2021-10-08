import { cloud_ids, shower_ids, rain_ids, snow_ids, mist_ids, clear_ids, wind_ids } from './Entities.js';

function backgroundImages(data) {
    const weatherId = data.weather[0].id;
    const cloudyColor = ['#CFCFC4', '#A9A9A0'];
    const showerColor = ['#85857E', '#62625D'];
    const rainColor = ['#41413E', '#232322'];
    const snowColor = ['#AEAEAE', '#EEECF1'];
    const mistColor = ['#B0B8B2', '#838D8F'];
    const clearColor = ['#B4D9EF', '#88AED0'];
    const windColor = ['#CFEBF7', '#87CEEB'];

    if (cloud_ids.includes(weatherId)) return cloudyColor;
    else if (shower_ids.includes(weatherId)) return showerColor;
    else if (rain_ids.includes(weatherId)) return rainColor;
    else if (snow_ids.includes(weatherId)) return snowColor;
    else if (mist_ids.includes(weatherId)) return mistColor;
    else if (clear_ids.includes(weatherId)) return clearColor;
    else if (wind_ids.includes(weatherId)) return windColor;
}

export default backgroundImages;