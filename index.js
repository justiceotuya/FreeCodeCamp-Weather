$(document).ready(function() {
  //your stuff

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lon = position.coords.longitude;
      var lat = position.coords.latitude;
      console.log(lat + " and " + lon);

      var urlData =
        "http://fcc-weather-api.glitch.me/api/current?lat=" +
        lat +
        "&lon=" +
        lon;
      console.log(urlData);
      $.ajax({ url: urlData, method: "GET", dataType: "json" })
        .done(function(response) {
          console.log(JSON.stringify(response));
          $("#js-city").text(response.name);

          $("img").attr("src", response.weather[0].icon);
          $("#js-temp").html(response.main.temp);
          var now = new Date(Date.now());
          $("#js-date").html(now.toLocaleString("en-us", { weekday: "long" }));
          $("#js-time").html(
            now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
          );
        })

        .fail(function() {
          alert("An error has occured");
        });
    });
  
  }
});
