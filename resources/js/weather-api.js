const callUserCoords = () => {
    let coords = {};

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(async position => {
            coords.latitude = position.coords.latitude;
            coords.longitude = position.coords.longitude;
            resolve(coords);
        }, error => {
            reject(error);
        });
    })
}

const callWeatherAPI = async () => {
    const APP_ID = 'e59cd7ffc256e26209a03b5e7fe1d8c8';
    let coords = await callUserCoords();
    
    let params = {
        appid:APP_ID,
        lat:coords.latitude,
        lon:coords.longitude,
        units:'metric',
        lang:'kr'
    }

    let url = 'https://api.openweathermap.org/data/2.5/weather?' + generateFormUrlEncoded(params);
    let response = await fetch(url);
    return response.json();
}

(async ()=> {
    let weatherData = await callWeatherAPI();
    weatherInfo.innerHTML = weatherData.main.temp + '℃ @' + weatherData.name;
})();