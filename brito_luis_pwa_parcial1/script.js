let cantBusq = 0;

let weather = {
  apiKey: "f1a8ea4996b8c121465af67af23a902d",
  
  fetchWeather: function (city) {
    console.log(cantBusq==0);
    if(cantBusq==0) {

        // objeto json minificado con la primer búsqueda por defecto guardado en Local Storage

        localStorage.setItem("data",JSON.stringify({"coord":{"lon":-58.3772,"lat":-34.6132},"weather":[{"id":802,"main":"Clouds","description":"scattered clear","icon":"03n"}],"base":"stations","main":{"temp":24.3,"feels_like":26.5,"temp_min":20.1,"temp_max":27.8,"pressure":1016,"humidity":68},"visibility":10000,"wind":{"speed":5.66,"deg":80},"clouds":{"all":40},"dt":1633040874,"sys":{"type":1,"id":8224,"country":"AR","sunrise":1632994271,"sunset":1633038931},"timezone":-10800,"id":3435910,"name":"Buenos Aires","cod":200}));
    }
    console.log(localStorage.getItem("data"));
    let dataSaved = JSON.parse(localStorage.getItem("data"));
    if (dataSaved.name.toLowerCase()==city.toLowerCase()){
        console.log("rta guardada");
        this.displayWeather(dataSaved);
        cantBusq++;
} else{
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No se encontró el clima deseado.");
          throw new Error("No se encontró el clima deseado.");
        }
        
        return response.json();
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("data", JSON.stringify(data));
        cantBusq++;
        this.displayWeather(data);
        })
     }
    
  },
  // cambio de background según clima

   mostrarClimaPorTemp: function(description){
    if (description.includes("clouds")){
        document.body.style.backgroundImage =
        "url('img/nublado.jpg')";
    }
        else if (description.includes("clear")){
        document.body.style.backgroundImage =
        "url('img/soleadito.jpg')";

    }
    
        else if (description.includes("rain")){
        document.body.style.backgroundImage =
        "url('img/lluvia.jpg')";
    }
        else{
        document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1920x1200/?landscape')";
        }
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, temp_max, temp_min, feels_like, pressure } = data.main;
    const { speed } = data.wind;
    document.querySelector(".ciud").innerText = "Clima en " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png"; // <-  icono según tipo de clima
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".temp_max").innerText = "Temperatura max: " + temp_max + "°C";
    document.querySelector(".temp_min").innerText = "Temperatura min: " + temp_min + "°C";
    document.querySelector(".feels_like").innerText = "Sensación térmica: " + feels_like + "°C";
    document.querySelector(".pressure").innerText = "Presión atm: " + pressure;
    document.querySelector(".humidity").innerText =
      "Humedad: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Velocidad del viento: " + speed + " km/h";
    document.querySelector(".loading").classList.remove("clima");
    console.log(description);
    this.mostrarClimaPorTemp(description);
    

  },
  

  search: function () {

    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};


document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Buenos Aires");


    