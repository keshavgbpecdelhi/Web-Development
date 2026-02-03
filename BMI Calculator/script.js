function calculateBMI(){
    var height=document.getElementById("height").value;
    var height_unit=document.getElementById("height-unit").value;
    var weight=document.getElementById("weight").value;
    var resultDiv=document.getElementById("result");
    var bmi=0;
    if(height_unit=='m'){
        bmi=weight/(height * height);
    }else{
        height=height/100;
        bmi=weight/(height * height);
    }
    resultDiv.textContent=bmi.toFixed(2);
}