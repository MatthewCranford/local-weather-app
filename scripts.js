$(document).ready(function(){

  getLocation();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var url = createUrl(position);
        getData(url);  
      }); 
    }
    else {
      document.getElementById("user-location").innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function createUrl(position) {
    var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
    return url;
  }

  function getData(url) {
    $.getJSON(url, function(data) {
      var id = data.weather[0].id;
      assignImage(id);

      var userLocation = document.getElementById("user-location");
      var weatherTemp = document.getElementById("weather-temp");
      var weatherIcon = document.getElementById("weather-icon");
      var weatherDescription = document.getElementById("weather-description")

      userLocation.innerHTML = data.name + ", " + data.sys.country;
      weatherTemp.innerHTML = getFahrenheit(data.main.temp);
      weatherDescription.innerHTML = data.weather[0].main;
      weatherIcon.src = data.weather[0].icon;
    }); 
  }

  function assignImage(id) {
    var gallery = [
      "https://www.dropbox.com/s/j2l7jvk8y5mfohs/clear.jpg?raw=1", // clear sky, id: 800
      "https://www.dropbox.com/s/c82bxoscfvvwawm/clouds.jpg?raw=1", // clouds, id: 801-804
      "https://www.dropbox.com/s/cgsa9vwwj4hcg51/drizzle.jpg?raw=1", // drizzle, id: 300-321
      "https://www.dropbox.com/s/7bz8jaxrhbkwszf/new-rain.jpg?raw=1", // rain, id: 500-531
      "https://www.dropbox.com/s/24toivyoo7do5x2/storm.jpg?raw=1", // lightning, id: 200-232
      "https://www.dropbox.com/s/u3bwainyw93ibbd/fog.jpg?raw=1", // fog, id: 701-781
      "https://www.dropbox.com/s/n2p2mrwaxwml2u2/snow.jpg?raw=1", // snow id: 600-622
    ]
    
    // assign background image based on id range
    switch(true) {
      case id === 800: // clear skies
        renderImage(gallery[0]);
        break;
      case id >= 801 && id <= 804: // cloudy
        renderImage(gallery[1]);
        break;
      case id >= 300 && id <= 321: // drizzle
        renderImage(gallery[2]);
        break; 
      case id >= 500 && id <= 531: // rain
       renderImage(gallery[3]);
        break;   
      case id >= 200 && id <= 232: // lightning
        renderImage(gallery[4]);
        break;   
      case id >= 701 && id <= 781: // fog
        renderImage(gallery[5]);
        break;   
      case id >= 600 && id <= 622: // snow
        renderImage(gallery[6]);
        break;     
      default: // clear skies
        renderImage(gallery[0]);
    }
  }

  function renderImage(image) {
    $('<img/>').attr('src', image).on('load', function() { // create image in memory and call function on load event
      $(this).remove(); // prevent memory leaks
      $('body').css('background-image', "url("+image+")");
      showPage();
    });
  }
  
  function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("weather-box").style.display = "block";
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

});