const apiKey = 'f53ff58bbecd1a510e5b9efe55195c3c';

const locationElement = document.getElementById("location")
const temperatureElement = document.getElementById("temperature")
const descriptionElement = document.getElementById("description")
const weatherIconElement = document.getElementById("weather-icon")
const currentTimeElement = document.getElementById("current-time")
const humdityElement = document.getElementById("humidity")
const pressureElement = document.getElementById("pressure")
const feelsLikeElement = document.getElementById("feels-like")
const speedElement = document.getElementById("speed")
const maxTempElement = document.getElementById("max-temp")
const minTempElement = document.getElementById("min-temp")
const inputSearch = document.getElementById("input-search")
const searchBtn = document.getElementById("search")
const inputForm = document.getElementById("inputForm")
const card = document.getElementsByClassName("card")
const weatherContainer = document.getElementById("weather-container")
const container = document.getElementById("container")

weatherContainer.style.display = "none"

async function getWeather(latitude, longitude) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&$units=metric&appid=${apiKey}`
    
    try {
        const response = await fetch(apiURL)
        const data = await response.json()

        
        if(data){
            setTimeout(() => {
                container.style.opacity = 100
                weatherContainer.classList.remove("text-blur-out")
                const time = new Date()
        
        const hariDalamSeminggu = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const namaHari = hariDalamSeminggu[time.getDay()];
        
        const bulanDalamSetahun = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Oktober", "November", "December"];
        const namaBulan = bulanDalamSetahun[time.getMonth()];
        
        const temperature = data.main.temp / 10
        const maxTemperature = data.main.temp_max / 10
        const minTemperature = data.main.temp_min / 10
        const feelsLike = data.main.feels_like/10
        
        currentTimeElement.textContent = `${namaHari}, ${time.getDate()} ${namaBulan} ${time.getFullYear()} at ${time.getHours().toString().padStart(2,"0")} : ${time.getMinutes().toString().padStart(2,"0")}`
        locationElement.textContent = `${data.name}, ${convertCountryName(data.sys.country)}`
        temperatureElement.textContent = `${temperature.toFixed(2)}°C`
        descriptionElement.textContent = `${data.weather[0].description}`
    humdityElement.textContent = `Humidity : ${data.main.humidity}%`
    pressureElement.textContent = `Pressure : ${data.main.pressure} hpa`
    feelsLikeElement.textContent = `Feels like : ${feelsLike.toFixed(2)}°C`
    speedElement.textContent = `Wind : ${data.wind.speed} m/s`
    maxTempElement.textContent = `Max : ${maxTemperature.toFixed(2)} °C`
    minTempElement.textContent = `Min : ${minTemperature.toFixed(2)} °C`
    
    container.style.backgroundSize = "cover"
    container.style.backgroundRepeat = "no-repeat"
    container.style.backgroundPosition = "center"
    
    if(data.weather[0].description == "clear sky"){
        weatherIconElement.innerHTML = `<img src="assets/sun.webp" alt="Weather Icon">`
        container.style.backgroundImage = "url('assets/weather/CLEAR SKY.webp')"
        
    } 
    if(data.weather[0].description == "few clouds"){
        weatherIconElement.innerHTML = `<img src="assets/cloud.webp" alt="Weather Icon">`
        container.style.backgroundImage = "url('assets/weather/CLOUDY.webp')"
    } 
    if(data.weather[0].description == "scattered clouds"){
        weatherIconElement.innerHTML = `<img src="assets/cloudy.webp" alt="Weather Icon">`
        container.style.backgroundImage = "url('assets/weather/SCATTERED CLOUD.webp')"
    }
    if(data.weather[0].description == "overcast clouds"){
        weatherIconElement.innerHTML = `<img src="assets/cloudy.webp" alt="Weather Icon">`;
        container.style.backgroundImage = "url('assets/weather/OVERCAST CLOUD.webp')"
    }
    if(data.weather[0].description == "broken clouds"){
        weatherIconElement.innerHTML = `<img src="assets/cloudy.webp" alt="Weather Icon">`
        container.style.backgroundImage = "url('assets/weather/OVERCAST CLOUD.webp')"
    } 
    if(data.weather[0].description == "rain"){
        weatherIconElement.innerHTML = `<img src="assets/rain.webp" alt="Weather Icon">`
        container.style.backgroundImage = "url('assets/weather/RAIN.webp')"
    } 
    if(data.weather[0].description == "shower rain"){
        weatherIconElement.innerHTML = `<img src="assets/rain.webp" alt="Weather Icon">`
        container.style.backgroundImage = "url('assets/weather/SHOWER RAIN.webp')"
    } 
    if(data.weather[0].description == "thunderstorm"){
        weatherIconElement.innerHTML = `<img src="assets/storm.webp" alt="Weather Icon">`
        container.style.backgroundImage = "url('assets/weather/THUNDER STORM.webp')"
    }
            }, 1000);
            setTimeout(() => {  
                weatherContainer.style.display = "flex"       
                weatherContainer.classList.add("text-focus-in")
            }, 1500);
        } else {
            return
        }
        
        console.log(data);
        
    
}

catch (error) {
    console.error(error);
    alert("Fetching data gagal")
}
}


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            getWeather(latitude,longitude)
        }, error => {
            alert("Gagal mendapatkan lokasi")
        });
    } else{
        alert("Geolocation tidak mendukung di browser kamu")
    }
}

window.onload = getLocation
container.style.opacity = 0
container.style.transition = "opacity .7s ease-in-out"


searchBtn.addEventListener("click", e => {

     let search = inputSearch
     
     e.preventDefault()
     
     currCity = search.value
     console.log(currCity);
     
     getCityWeather(currCity)
     
     search.value = ""
    })
    
    inputForm.addEventListener("submit", e => {
        
        
        let search = inputSearch
        
        e.preventDefault()
        
        currCity = search.value.trim()
        
        console.log(currCity);
        
        getCityWeather(currCity)
        
        search.value = ""
    })
    
    async function getCityWeather(currCity){
        
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${apiKey}`
        
        try {
            if(currCity == ""){
                throw new Error("Please input a city")
            }
            const response = await fetch(apiURL)

            if(!response.ok){
                container.style.opacity = 100
                throw new Error("City not found")
            }

            const data = await response.json()
            console.log(data);

            const latitude = data.coord.lat
            const longitude = data.coord.lon
            getWeather(latitude,longitude)
            
            weatherContainer.classList.add("text-blur-out")  
            setTimeout(() => {
            container.style.opacity = 0
        }, 500);
    }
    catch (error) {
        console.error(error);
        alert(error.message)
}
}

function convertCountryName(country){
    let regionNames = new Intl.DisplayNames(["en"], {type : "region"});
    return regionNames.of(country)
}