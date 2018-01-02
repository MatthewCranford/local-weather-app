$(document).ready(function(){

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

    });
  }

  var currentUnit = "fahrenheit"
  // Toggle from fahrenheit to celsius
  $("#unit").click(function() {
    var temp = document.getElementById("temp");
    var unit = document.getElementById("unit");
    
    if (currentUnit === "fahrenheit") {
    temp.innerHTML = getCelsius(temp.innerHTML);
    unit.innerHTML = "C";
    currentUnit = "celsius";
    }
    else {
    temp.innerHTML = getFahrenheit(temp.innerHTML);
    unit.innerHTML = "F";
    currentUnit = "fahrenheit";
    
    }
  });


  getLocation();

});