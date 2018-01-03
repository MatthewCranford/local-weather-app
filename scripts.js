$(document).ready(function(){

  var gallery = [
    "https://www.dropbox.com/s/86d4t39uuuvgykh/Thunderstorm_over_Corfu.jpg?raw=1", // lightning
    "https://www.dropbox.com/s/yz9b76fccpe9dvz/clouds-cloudporn-weather-lookup-158163.jpeg?raw=1", // clouds
    "https://www.dropbox.com/s/mgfzphclt29q0it/Forested_hills_in_Lysekil_in_fog_-_wide_-_B%26W.jpg?raw=1", // fog
    "https://www.dropbox.com/s/mge7awopq7wz33s/pexels-photo-346529.jpeg?raw=1", // clear sky
    "https://www.dropbox.com/s/l9vixcqnqqpns7e/view-to-rain-from-wooden-veranda.jpg?raw=1", // rain
    "https://www.dropbox.com/s/ehddchvdoabgdhy/pink-leaf-2779535_960_720.jpg?raw=1", // drizzle
    "https://www.dropbox.com/s/mmrxhzrf38qg7a2/snow-landscape-trees-winter.jpg?raw=1", // snow
  ]

  function getFahrenheit(celsius) {
    return Math.round(celsius * 1.8 + 32);
  }

  function getCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) * .5556);
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition); 
    }
    else {
      x.innerHTML = "Geolocation is not supported by this browser.";
  }
  }

  function showPosition(position) {
    var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
    console.log(url);

    var userLocation = document.getElementById("user-location");
    var weatherTemp = document.getElementById("weather-temp");
    var weatherIcon = document.getElementById("weather-icon");
    var weatherDescription = document.getElementById("weather-description")
     

    $.getJSON(url, function(result) {
      userLocation.innerHTML = result.name + ", " + result.sys.country;
      weatherTemp.innerHTML = getFahrenheit(result.main.temp);
      weatherIcon.src = result.weather[0].icon;
      weatherDescription.innerHTML = result.weather[0].main;

      var id = result.weather[0].id

      // WORK IN PROGRESS
      // Switch statement to assign background image based on id range
      switch(id) {
        case (id < 300): 
      }
      // if ( < 800) {
      //   console.log("true");
      //   $("body").css("background-image", "url("+gallery[3]+")")
    });
  }

  var currentUnit = "fahrenheit"
  // Toggle from fahrenheit to celsius
  $("#unit").click(function() {
    var weatherTemp = document.getElementById("weather-temp");
    var unit = document.getElementById("unit");
    
    if (currentUnit === "fahrenheit") {
      weatherTemp.innerHTML = getCelsius(weatherTemp.innerHTML);
      unit.innerHTML = "C";
      currentUnit = "celsius";
    }
    else {
      weatherTemp.innerHTML = getFahrenheit(weatherTemp.innerHTML);
      unit.innerHTML = "F";
      currentUnit = "fahrenheit";
    }
  });


  getLocation();

});