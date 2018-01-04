$(document).ready(function(){


  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success); 
    }
    else {
      document.getElementById("user-location").innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function success(position) {
    var url = createUrl(position);
    getData(url);  
  }

  function createUrl(position) {
    var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
    return url;
  }


  function getData(url) {
    $.getJSON(url, function(data) {
      var id = data.weather[0].id;
      renderBackground(id);

      var userLocation = document.getElementById("user-location");
      var weatherTemp = document.getElementById("weather-temp");
      var weatherIcon = document.getElementById("weather-icon");
      var weatherDescription = document.getElementById("weather-description")

      userLocation.innerHTML = data.name + ", " + data.sys.country;
      weatherTemp.innerHTML = getFahrenheit(data.main.temp);
      weatherIcon.src = data.weather[0].icon;
      weatherDescription.innerHTML = data.weather[0].main;
   
    });
  }

  function renderBackground(id) {

    var gallery = [
      "https://www.dropbox.com/s/mge7awopq7wz33s/pexels-photo-346529.jpeg?raw=1", // clear sky, id: 800
      "https://www.dropbox.com/s/zi1r7ywe861kjeu/pexels-photo-414491.jpeg?raw=1", // clouds, id: 801-804
      "https://www.dropbox.com/s/ehddchvdoabgdhy/pink-leaf-2779535_960_720.jpg?raw=1", // drizzle, id: 300-321
      "https://www.dropbox.com/s/l9vixcqnqqpns7e/view-to-rain-from-wooden-veranda.jpg?raw=1", // rain, id: 500-531
      "https://www.dropbox.com/s/86d4t39uuuvgykh/Thunderstorm_over_Corfu.jpg?raw=1", // lightning, id: 200-232
      "https://www.dropbox.com/s/mgfzphclt29q0it/Forested_hills_in_Lysekil_in_fog_-_wide_-_B%26W.jpg?raw=1", // fog, id: 701-781
      "https://www.dropbox.com/s/mmrxhzrf38qg7a2/snow-landscape-trees-winter.jpg?raw=1", // snow id: 600-622
    ]

    // Assign background image based on id range
    switch(true) {
      case id === 800: // clear skies
        $("body").css("background-image", "url("+gallery[0]+")");
        break;
      case id >= 801 && id <= 804: // cloudy
        $("body").css("background-image", "url("+gallery[1]+")");
        break;
      case id >= 300 && id <= 321: // drizzle
        $("body").css("background-image", "url("+gallery[2]+")");
        break; 
      case id >= 500 && id <= 531: // rain
        $("body").css("background-image", "url("+gallery[3]+")");
        break;   
      case id >= 200 && id <= 232: // lightning
        $("body").css("background-image", "url("+gallery[4]+")");
        break;   
      case id >= 701 && id <= 781: // fog
        $("body").css("background-image", "url("+gallery[5]+")");
        break;   
      case id >= 600 && id <= 622: // snow
        $("body").css("background-image", "url("+gallery[6]+")");
        break;     
      default: // clear skies
        $("body").css("background-image", "url("+gallery[0]+")")
    }
  }
  

  
  // Toggle from fahrenheit to celsius
  $("#unit").click(function() {
    changeDegreeUnit();
  });


  function changeDegreeUnit() {
    var weatherTemp = document.getElementById("weather-temp");
    var unit = document.getElementById("unit");
 
    if (unit.innerHTML === "F") {
      weatherTemp.innerHTML = getCelsius(weatherTemp.innerHTML);
      unit.innerHTML = "C";
      currentUnit = "celsius";
    }
    else {
      weatherTemp.innerHTML = getFahrenheit(weatherTemp.innerHTML);
      unit.innerHTML = "F";
      currentUnit = "fahrenheit";
    }
  }

  function getCelsius(fahrenheit) {
    return Math.round((fahrenheit - 32) * .5556);
  }

  
  function getFahrenheit(celsius) {
    return Math.round(celsius * 1.8 + 32);
  }




  getLocation();

});