let result = document.getElementById("result");

function insert(num){
    result.value += num;
}
function calculate(){
    result.value = eval(result.value);
}
function clean(){
    result.value = '';
}
//function to notice keyPress and perform the neccesary operations
document.addEventListener("keydown",function(event){
    switch(event.key){
        case "c":
            clean();
            break;
        case "=":
            calculate();
            break;
        case "%":
            insert(event.key);
            break;
        case "/":
            insert(event.key);
            break;
        case "*":
            insert(event.key);
            break;
        case "7":
            insert(event.key);
            break;
        case "8":
            insert(event.key);
            break;
        case "9":
            insert(event.key);
            break;
        case "4":
            insert(event.key);
            break;
        case "5":
            insert(event.key);
            break;
        case "6":
            insert(event.key);
            break;
        case "-":
            insert(event.key);
            break;
        case "1":
            insert(event.key);
            break;
        case "2":
            insert(event.key);
            break;
        case "2":
            insert(event.key);
            break;
        case "3":
            insert(event.key);
            break;
        case "+":
            insert(event.key);
            break;
        case "00":
            insert(event.key);
            break;
        case "0":
            insert(event.key);
            break;
        case ".":
            insert(event.key);
            break;
        default:
            console.log(event.key);
            break;  
    }
});