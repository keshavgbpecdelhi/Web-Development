function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date()); // get total difference in seconds
    var seconds = Math.floor((t / 1000) % 60); // convert total seconds to number of seconds by diving total seconds by number of seconds remaining after days,hours, and minutes are account for
    var minutes = Math.floor((t / 1000 /60) % 60); // convert total seconds to number of minutes by diving total seconds by number of minutes remaining after days and hours are account for
    var hours = Math.floor((t / (1000 * 60 *60)) % 24); // convert total seconds to number of hours by diving total seconds by number of hours remaining after days are accounted for 
    var days = Math.floor(t / (1000 * 60 * 60 * 24)); // convert total seconds to number of days by dividing total seconds by number of days in seconds
    debugger;
    return {
        'total' : t,
        'days' : days,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
    };
}

function initializeClock(id, endtime){
    var clock = document.getElementById(id); //first grab #clockdiv from div
    var daysSpan = clock.querySelector('.days'); // grab the days span tag from the #clockdiv's div
    var hoursSpan = clock.querySelector('.hours'); // grab the hours span tag from the #clockdiv's div
    var minutesSpan = clock.querySelector('.minutes'); // grab the minutes span tag from the #clockdiv's div
    var secondsSpan = clock.querySelector('.seconds'); // grab the seconds span tag from the #clockdiv's div

    function updateClock(){
        var t = getTimeRemaining(endtime); // calculate endtime date - current date and return a date object with days, hours, minutes, and seconds
    
        daysSpan.innerHTML = t.days; //display number of days
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2); //use negative to slice from end of string. when number is 024, the 0 will be sliced, return 24. When number is 09, slice will return 09. 
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
    
        if(t.total <=0){
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

//initialize today's date and then add days, hours, minutes, and seconds to it.
//set today as new Date
//add number of days (in seconds)
//parse the total number of seconds
//convert the total number of seconds into the new date
var deadline = new Date(Date.parse(new Date()) + 7 * 24 * 60 *60 *1000); 

initializeClock('clockdiv', deadline); // grab needed HTML elements from the page, and add the date from which the timer begin its countdown