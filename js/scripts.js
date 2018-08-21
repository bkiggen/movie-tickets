// Business logic

function MovieTicket(movie, time, type) {
  this.movie = movie;
  this.showtime = time;
  this.ticketType = type;
}

MovieTicket.prototype.price = function() {
  var price = 12;
  if (this.movie.reperatory === true) {
    price = price - 2;
  }
  if (this.showtime < 500) {
    price = price - 2;
  }
  if (this.ticketType !== "general") {
    price = price - 3;
  }
  return price;
}

function Movie(title, rep, times, shortName) {
  this.title = title;
  this.reperatory = rep;
  this.showtimes = times;
  this.shortName = shortName;
}

Movie.prototype.timeFormat = function() {
  var timeStrings = [];
  this.showtimes.forEach(function(showtime) {
    var timeString = showtime.toString();
    if (timeString.length === 3){
      timeString = timeString[0] + ":" + timeString[1] + timeString[2];
      timeStrings.push(timeString);
    }
    return timeStrings;
  })
}

var mission = new Movie("Mission Improbable", false, [130, 300, 500, 730, 900], "mission");
var sorry = new Movie("Sorry To Trouble You", false, [200, 330, 530, 800, 930], "sorry");
var casa = new Movie("Casablanca", true, [100, 245, 445, 715, 915], "casa");
var horiz = new Movie("Horizontigo", true, [100, 245, 430, 715, 900], "horiz");

var allMovies = [mission, sorry, casa, horiz];
allMovies.forEach(function(movie) {})

console.log(horiz.timeFormat());

// User interface logic


$(document).ready(function() {
  var userMovie;
  var userAge;
  var userShowTime;


  allMovies.forEach(function(movie) {
    $("select#title").append("<option value='" +
      movie.shortName +
      "'>" +
      movie.title +
      "</option>");
  });

  $("form #title").focusout(function(event) {
    event.preventDefault();
    userMovie = eval($("#title").val());
    $("select#showTimes").text("");

    for(var i=0; i < userMovie.showtimes.length; i++) {
      $("select#showTimes").append("<option id='" +
        userMovie.showtimes[i] +
        "' value='" +
        userMovie.showtimes[i] +
        "'>" +
        userMovie.showtimes.timeFormat() +
        "</option>");
    };
  });

  $("form.title-input").submit(function() {
    event.preventDefault();
    userAge = $("#age").val();
    userShowTime = $("#showTimes").val();
    var userTicket = new MovieTicket(userMovie, userShowTime, userAge);
    var price = userTicket.price();
    $("#output").html("<h2>" +
    userMovie.title +
    "</h2>" +
    "<p>$" +
    userTicket.price() +
    ".00</p>" +
    "<p>Playing at " +
    userTicket.showtime +
    "</p>" +
    "<p>" +
    "Enjoy the show!" +
    "</p>")
  });
});
