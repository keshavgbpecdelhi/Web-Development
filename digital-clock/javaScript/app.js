function showTime() {
  var time = new Date();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  var updateHours = document.getElementById("hours");
  var updateMinutes = document.getElementById("minutes");
  var updateSeconds = document.getElementById("seconds");
  var updateSession = document.getElementById("session");
  var session = "AM";

  if (hours == 0) {
    hours = 12;
  }
  if (hours > 12) {
    hours = hours - 12;
    session = "PM";
  }

  updateHours.innerHTML = hours;
  updateMinutes.innerHTML = minutes;
  updateSeconds.innerHTML = seconds;
  updateSession.innerHTML = session;

  setTimeout(showTime, 1000);
}
showTime();
