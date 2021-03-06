$(document).ready(function () {

  //Get Location of the user
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function (position) {

      var lon = position.coords.longitude;
      var lat = position.coords.latitude;
      console.log(lat + " and " + lon);

      //parsing Url using geoltion data
      var urlData = "http://fcc-weather-api.glitch.me/api/current?lat=" + lat +
        "&lon=" +
        lon;


      //geting weather data from api
      $.ajax({
          url: urlData,
          method: "GET",
          dataType: "json"
        })


        .fail(function () {
          alert("An error has occured");
        })


        .done(function (response) {
          dataParse();
          getDateTime();
          convertTemp();

          //data parsing function
          function dataParse() {
            $("#js-city").text(response.name);
            $("img").attr("src", response.weather[0].icon);
            $("#js-temp").html(response.main.temp);
            $("#js-description").html(response.weather[0].description);
          }

          //date function
          function getDateTime() {
            var now = new Date(Date.now());
            $("#js-date").html(now.toLocaleString("en-us", {
              weekday: "long"
            }));
            // $("#js-time").html(
            //   now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "hr"
            // );
            var hrs = now.getHours();
            if (hrs > 12) {
              $("#js-time").html(hrs - 12 + now.getMinutes() + ":" + now.getSeconds() + " PM");
            } else if (hrs < 12) {
              $("#js-time").html(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " AM");
            } else if (hrs === 12) {
              $("#js-time").html(now.getHours() +
                ":" + now.getMinutes() + ":" + now.getSeconds() + " NOON");
            }
            var greet;
            if (hrs < 12) {
              greet = 'Good Morning';
            } else if (hrs >= 12 && hrs <= 17) {
              greet = 'Good Afternoon';
            } else if (hrs >= 17 && hrs <= 24) {
              greet = 'Good Evening';
            }

            $("span#js-greeting").text(greet);
          }

          //converting to fahrenheit function anad vice versa

          function convertTemp() {
            var Celcius = true;

            $("#js-tempButton").on("click", function () {
              if (Celcius) {
                var fahrenheit = (response.main.temp * 1.8) + 32;
                $("#js-temp").text(fahrenheit.toFixed(1));
                $(".js-degree").text("°F");
                $(this).text("Celcius");
                Celcius = false;
              } else if (!Celcius) {
                $("#js-temp").text(response.main.temp);
                $(".js-degree").text("°C");
                $(this).text("Fahrenheit");
                Celcius = true;
              }
            });

          }


        });
    });


  }

});