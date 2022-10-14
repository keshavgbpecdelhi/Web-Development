
const TimeZoneData = {
  IST: 5.3,
  GMT: 0,
  ECT: 1,
  EET: 2,
  ART: 2,
  EAT: 3,
  MET: 3.3,
  NET: 4,
  PLT: 5,
  BST: 6,
  VST: 7,
  CTT: 8,
  JST: 9,
  ACT: 9.3,
  AET: 10,
  SST: 11,
  NST: 12,
  MIT: -11,
  HST: -10,
  AST: -9,
  PST: -8,
  PNT: -7,
  MST: -7,
  CST: -6,
  EST: -5,
  PRT: -4,
  CNT: -3.3,
  AGT: -3,
  BET: -3,
  CAT: -1,
};
let timezone = document.getElementById("TimeZone");
for (key in TimeZoneData) {
    timezone.innerHTML += `<option value="${key}">${key}</option>`;
}

setInterval(() => {
    const time = document.querySelector(".display #time");
    let day_night = "AM";
    let TZ = timezone.value;
  let date = new Date();
    let hours = date.getUTCHours();
    console.log(hours);
    if (hours > 12) {
        hours -= 12;
        day_night = "PM";
    }
   
    hours += Math.floor(TimeZoneData[TZ]);
    let minutes = date.getUTCMinutes();
    let minutestoadd = (TimeZoneData[TZ] - Math.floor(TimeZoneData[TZ]));
    if (minutestoadd > 0) {
        minutestoadd = 30;
    }
    minutes += minutestoadd;
    if (minutes > 60) {
        hours += 1;
        minutes -= 60;
    }
    let seconds = date.getUTCSeconds();
    
    let millisec = Math.floor(date.getUTCMilliseconds() / 10).toFixed(0);
    
    
    if (hours > 12) {
        day_night = "AM";
        hours = hours - 12;
    }
    
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (millisec < 10) {
    millisec = "0" + millisec;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + Math.abs( hours);
  }
  time.textContent =
    hours + ":" + minutes + ":" + seconds + ":" + millisec + " " + day_night;
});
