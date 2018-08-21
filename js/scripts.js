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
  var strings = [];
  var timeString;
  var timeString2;
  this.showtimes.forEach(function(showtime) {
    timeString = showtime.toString();

    if (timeString.length === 3) {
      timeString2 = timeString[0] + ":" + timeString[1] + timeString[2];
      strings.push(timeString2);
    } else {
      timeString2 = timeString[0] + timeString[1] + ":" + timeString[2] + timeString[3];
    }
  })
  return strings;
}

function timeFormat2 (time) {
  var timeStr = time.toString();
  var output;
  if (timeStr.length === 3) {
    output = timeStr[0] + ":" + timeStr[1] + timeStr[2];
  } else {
    output = timeStr[0] + timeStr[1] + ":" + timeStr[2] + timeStr[3];
  }
  return output;
}


var mission = new Movie("Mission Improbable (R)", false, [130, 300, 500, 730, 900], "mission");
var sorry = new Movie("Sorry To Trouble You (R)", false, [200, 330, 530, 800, 930], "sorry");
var casa = new Movie("Casablanca (PG)", true, [100, 245, 445, 715, 915], "casa");
var horiz = new Movie("Horizontigo (PG)", true, [100, 245, 430, 715, 900], "horiz");

var allMovies = [mission, sorry, casa, horiz];
allMovies.forEach(function(movie) {})

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
        userMovie.timeFormat()[i] +
        "</option>");
    };
  });

  $("form.title-input").submit(function() {
    event.preventDefault();
    userAge = $("#age").val();
    userShowTime = $("#showTimes").val();
    var userTicket = new MovieTicket(userMovie, userShowTime, userAge);
    var price = userTicket.price();
    $("#output").show();
    $("#output").html(
    "<p id='price'>$" +
    userTicket.price() +
    ".00</p>" +
    "<h2 id='title'>" +
    userMovie.title +
    "</h2>" +
    "<p id='time'>Playing at " +
    timeFormat2(userShowTime) +
    "</p>" +
    "<p id='enjoy'>" +
    "Enjoy the show!" +
    "</p>");

  });
});
