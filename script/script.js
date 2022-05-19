let lon;
let lat;
let temperature = document.querySelector("#temp");
let summary = document.querySelector("#summary");
let loc = document.querySelector("#location");
let icon = document.querySelector("#icon");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let temperatureMinMax = document.querySelector("#tempMinMax");

const kelvin = 273;

function addZero(i) {
	if (i < 10) {i = "0" + i}
	return i;
  }

function date(){
    let today = new Date();

    let dd = addZero(today.getDate());
    let mm = today.getMonth(); 
    let yyyy = today.getFullYear();
	let hh = addZero(today.getHours());
	let min = addZero(today.getMinutes());
	
	const month = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
	let mese = month[today.getMonth()];

    return today = dd + ' ' + mese + ' ' + yyyy + ' ' + hh + ':' + min;
}

let dataOdierna = document.querySelector("#date");

function inizialeMaiuscola(sentence){

    let iniziale = (sentence.charAt(0)).toUpperCase();
    return sentence = iniziale + sentence.slice(1);

}

window.addEventListener("load", () => {
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition((position) => {
	console.log(position);
	lon = position.coords.longitude;
	lat = position.coords.latitude;

	// API ID
	const api ="e0b9ed333363b59ea45adf00b7c969a7";

	// API URL
	/*const base =
`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
`lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;*/
    const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&lang=it`
    
    // Calling the API
	fetch(base)
		.then((response) => {
		return response.json();
		})
		.then((data) => {

		console.log(data);
		temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C";
        
		temperatureMinMax.textContent = Math.floor(data.main.temp_min - kelvin) + "° ~ " + Math.floor(data.main.temp_max - kelvin) + "° ";
				
		humidity.textContent = data.main.humidity + " %";
        wind.textContent = data.wind.speed + " KM/h";
               
		summary.textContent = inizialeMaiuscola(data.weather[0].description);

        dataOdierna.textContent = date();
		
		loc.textContent = data.name;

		let icon1 = data.weather[0].icon;
		icon.innerHTML = `<img src="./icons/${icon1}.png" style= 'height:8rem'/>`;

		});
	});
}
});
