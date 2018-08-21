// Business logic

//TICKET CONSTUCTOR
function MovieTicket(movie, time, type) {
  this.movie = movie;
  this.showtime = time;
  this.ticketType = type;
}

//TICKET COST
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

//MOVIE CONSTUCTOR
function Movie(title, rep, times, shortName) {
  this.title = title;
  this.reperatory = rep;
  this.showtimes = times;
  this.shortName = shortName;
}

//TIME FORMAT
Movie.prototype.timeFormat = function() {
  var strings = [];
  var timeString;
  var timeString2;
  this.showtimes.forEach(function(showtime) {
    timeString = showtime.toString();

    if (timeString.length === 3) {
      timeString2 = timeString[0] + ":" + timeString[1] + timeString[2];
      strings.push(timeString2);
    } else if (timeString.length === 4){
      timeString2 = timeString[0] + timeString[1] + ":" + timeString[2] + timeString[3];
      strings.push(timeString2);
    }
  })
  return strings;
}

//TIME FORMAT 2
function timeFormat2 (time) {
  var timeStr = time.toString();
  var output;
  if (timeStr.length === 3) {
    output = timeStr[0] + ":" + timeStr[1] + timeStr[2];
  } else if (timeStr.length === 4){
    output = timeStr[0] + timeStr[1] + ":" + timeStr[2] + timeStr[3];
  }
  return output;
}


//MOVIE OBJECT CONSTRUCTORS
var mission = new Movie("Mission Improbable (R)", false, [130, 300, 500, 730, 900], "mission");
var sorry = new Movie("Sorry To Trouble You (R)", false, [200, 330, 530, 800, 930], "sorry");
var casa = new Movie("Casanegra (PG)", true, [100, 245, 445, 715, 915], "casa");
var horiz = new Movie("Horizontigo (PG)", true, [100, 245, 430, 715, 900], "horiz");

var allMovies = [mission, sorry, casa, horiz];
allMovies.forEach(function(movie) {})

// User interface logic

$(document).ready(function() {
//VARIABLES
  var userMovie;
  var userAge;
  var userShowTime;

//RENEW LIST
function renewList() {
  $("select#title").empty();
  allMovies.forEach(function(movie) {
    $("select#title").append("<option value='" +
      movie.shortName +
      "'>" +
      movie.title +
      "</option>");
  });
}
renewList();

//POPULATE SHOWTIMES LIST
  $("form #title").focusout(function(event) {
    event.preventDefault();
    userMovieInput = $("#title").val();
    console.log(userMovieInput);
    userMovie = "";
    allMovies.forEach(function(movie) {
      if (movie.shortName === userMovieInput) {
        userMovie = movie;
      }
    })
    console.log(userMovie);
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

  //MAIN SUBMIT
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

  //TOGGLE OWNER SECTION
  $("#owner-button").click(function(){
    $(".theater-owner").toggle();
  });

  //OWNER UNPUT
  $("form#get-movie-info").submit(function(event) {
    event.preventDefault();

    var inputtedMovieTitle = $("#get-movie-title").val();
    var inputtedShortName = $("#get-movie-short-name").val();
    var inputtedShowtimes = $("#get-movie-showtimes").val();
    var inputtedReperatory = false;
    if ($("input[name='get-movie-rep']:checked").val() === "old") {
      inputtedReperatory = true;
    }
    var inputtedShowtimes = $("#get-movie-showtimes").val();
    var showtimesArray = inputtedShowtimes.split(", ");
    showtimesArray.map(function(time) {
      var output = [];
      output.push(parseInt(time));
      return output;
    })
    var inputtedMovie = new Movie(inputtedMovieTitle, inputtedReperatory, showtimesArray, inputtedShortName);
    allMovies.push(inputtedMovie);
    console.log(allMovies);
    $("#get-movie-title").val("");
    $("#get-movie-short-name").val("");
    $("#get-movie-showtimes").val("");
    renewList();
  })
});
