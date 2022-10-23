function temperatureConverter(tempType, userVal) {

    userVal = parseFloat(userVal);

    var userCelsiusVal = document.getElementById("celciusVal");
    var userFahrenheitVal = document.getElementById("fahrenheitVal");
    var userKelvinVal = document.getElementById("kelvinVal");

    if (tempType == "fahrenheitVal") {
        userCelsiusVal.value = ((userVal - 32) / 1.8).toFixed(2);
        userKelvinVal.value = (((userVal - 32) / 1.8) + 273.15).toFixed(2);
    }
    if (tempType == "celciusVal") {
        userFahrenheitVal.value = ((userVal * 1.8) + 32).toFixed(2);
        userKelvinVal.value = ((userVal) + 273.15).toFixed(2);
    }
    if (tempType == "kelvinVal") {
        userFahrenheitVal.value = (((userVal - 273.15) * 1.8) + 32).toFixed(2);
        userCelsiusVal.value = ((userVal) - 273.15).toFixed(2);
    }
}