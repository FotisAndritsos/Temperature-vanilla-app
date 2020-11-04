import { name } from './config.js';

let locat = document.getElementById('location');
const btn = document.querySelector('.btn');
const labelLoc = document.querySelector('.labelLoc');
const headerLoc = document.querySelector('.header-loc');
const headerTemp = document.querySelector('.header-temp');
const imgIcon = document.querySelector('.imgicon');
const temIcon = document.getElementById('temIcon');



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


function getWeather(city) {
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${name}`;
    
    
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            let fu = capitalizeFirstLetter(city);
            if(city === ""){
                labelLoc.textContent = "Please enter a location";
            }else if(!isNaN(city)){
                labelLoc.textContent = "Please enter a location not a number";
            }else if(fu !== data.name){
                labelLoc.textContent = "Please check your spelling";
            }else{
            labelLoc.textContent = "";
            headerLoc.textContent = data.name;
            headerTemp.textContent = Math.floor(data.main.temp - 273.15);
            const spa = document.createElement ('span')
            spa.innerHTML = "&#8451";
            headerTemp.appendChild (spa);
            let tempvariable = data['weather'][0]['icon'];
            let temLink = "http://openweathermap.org/img/wn/"+ tempvariable + ".png";
            temIcon.src = temLink;
            }
        });
};





btn.addEventListener('click',(event)=>{
    
    event.preventDefault();
    let yo = locat.value;
    
    getWeather(yo);
    headerLoc.textContent = "";
    headerTemp.textContent = "";
    temIcon.src = "";
    locat.value="";

 })
