//elements fetched 
const userTab = document.querySelector('[data-userWeather]');
const searchTab = document.querySelector('[data-searchWeather]');
const userConatiner = document.querySelector('.weather-container');
const grantAccessContainer = document.querySelector('.grant-location-container');
const grantAccessBtn = document.querySelector('[data-grantAccess]');
const searchForm = document.querySelector('[data-searchForm]');
const searchFormInput = document.querySelector('[data-searchInput]');
const searchFormButton = document.querySelector('#formSearchButton');
const loadingContainer = document.querySelector('.loading-container');
const errorInApiCallContainer = document.querySelector['data-error-apicall'];
const weatherInfoContainer = document.querySelector('.user-info-container');
const locationErrorContainer = document.querySelector('.locationFetchError');
const errorbox = document.querySelector('.serachErrorContainer');




//global variabled 
const apikey = 'e9d07fd7d84f0bc7da9a000ac0219ccb';
let currentTab = userTab;
currentTab.classList.add('current-tab');

//default hai
getFromSessionStorage();





// methods 

//to switch between tabs
function switchTab(clickedTab){

    //change the background pro of current tab
    if(clickedTab !== currentTab){
        currentTab.classList.remove('current-tab');
        currentTab = clickedTab;
        currentTab.classList.add('current-tab');
    }

    //agar search tab click kiya ho to
    if(!searchForm.classList.contains('active')){
        grantAccessContainer.classList.remove('active');
        weatherInfoContainer.classList.remove('active');
        searchForm.classList.add('active');
        locationErrorContainer.classList.remove('active');
    }
    else{ //agar user info click kiya to
        searchForm.classList.remove('active');
        errorbox.classList.remove('active');
        if(weatherInfoContainer.classList.contains('active'))
            weatherInfoContainer.classList.remove('active');

        //ab user weather chaiye hoga check karo pehle se storage me hain kya 
        getFromSessionStorage();
    }
}

userTab.addEventListener('click',() => {
    //passs clicked tab as input 
    switchTab(userTab);
});

searchTab.addEventListener('click',() => {
    //passs clicked tab as input 
    switchTab(searchTab);
});

function getFromSessionStorage(){
    locationErrorContainer.classList.remove('active');
    const localCoordinates = sessionStorage.getItem('user-coordinates');

    //store nahi hain
    if(!localCoordinates){
        grantAccessContainer.classList.add('active');
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserInfo(coordinates);
    }
}

async function fetchUserInfo(coordinates){
    const {lat,lon} = coordinates;

    //make grant wala invisible
    grantAccessContainer.classList.remove('active');
    loadingContainer.classList.add('active');

    //api call
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`);
        const weatherInfo = await response.json();
        loadingContainer.classList.remove('active');
        weatherInfoContainer.classList.add('active');
        renderWeatherInUI(weatherInfo);
    }
    catch(e){
        loadingContainer.classList.remove('active');
        
        //HW
        

    }
}

function renderWeatherInUI(weatherInfo){

    //selectors
    const CityName = document.querySelector('[data-cityName]');
    const CountryIcon = document.querySelector('[data-countryIcon]');
    const WeatherDesc = document.querySelector('[data-weatherDesc]');
    const WeatherIcon = document.querySelector('[data-weatherIcon]');
    const WeatherCurrentTemparature = document.querySelector('[data-temparature]');
    const windSpeedConatiner = document.querySelector('[data-windSpeed]');
    const HumidityConatiner = document.querySelector('[data-humidity]');
    const cloudsContainer = document.querySelector('[data-clouds]');

    //values from api
    const windspeed = (weatherInfo?.wind?.speed).toFixed(2)+"m/s";
    const clouds = weatherInfo?.clouds?.all + "%";
    const humidity = weatherInfo?.main?.humidity + "%";
    const temparature = weatherInfo?.main?.temp + " °C";
    const weatherDesc = weatherInfo?.weather[0]?.main;
    const weatherDescImg = `https://openweathermap.org/img/w/${weatherInfo?.weather[0]?.icon}.png`;
    const placeName = weatherInfo?.name;
    const countryFlag = `https://flagcdn.com/96x72/${weatherInfo?.sys?.country.toLowerCase()}.png`;


    //setting values
    CityName.textContent = placeName;
    CountryIcon.src = countryFlag;
    WeatherDesc.textContent = weatherDesc;
    WeatherIcon.src = weatherDescImg;
    WeatherCurrentTemparature.textContent = temparature;
    windSpeedConatiner.textContent = windspeed;
    HumidityConatiner.textContent=humidity;
    cloudsContainer.textContent=clouds;
    
}

grantAccessBtn.addEventListener('click',() => {
    getLocation();
});

async function getLocation(){
    try{
        if(navigator.geolocation){
            const locationPromise = await new Promise((resolve,reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        storePosition(position);
                        resolve(2);
                    },
                    (error) => {
                        reject(error);
                    }
                )
            });
        }
        else{
            grantAccessContainer.classList.remove('active');
            locationErrorContainer.classList.add('active');
        }
    }
    catch(e){
        grantAccessContainer.classList.remove('active');
        locationErrorContainer.classList.add('active');
    }
}

function storePosition(postion){
    const location =  {
        lat: postion?.coords?.latitude,
        lon: postion?.coords?.longitude
    };

    sessionStorage.setItem("user-coordinates",JSON.stringify(location));

    fetchUserInfo(location);
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(searchFormInput.value){
        fetchSearchInfo(searchFormInput.value);
    }
});

async function fetchSearchInfo(cityName){
    errorbox.classList.remove('active');
    loadingContainer.classList.add('active');
    grantAccessContainer.classList.remove('active');
    weatherInfoContainer.classList.remove('active');
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`);
        const weatherData = await response.json();
        renderWeatherInUI(weatherData);
        loadingContainer.classList.remove('active');
        weatherInfoContainer.classList.add('active');
        renderWeatherInUI(weatherData);
    }
    catch(e){
        loadingContainer.classList.remove('active');
        errorbox.classList.add('active');
    }
}