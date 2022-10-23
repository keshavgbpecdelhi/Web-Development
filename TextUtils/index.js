function upper() {
    let currtxt = document.getElementById('txt').value;
    document.getElementById('txt').value = currtxt.toUpperCase();
}
function lower() {
    let currtxt = document.getElementById('txt').value;
    document.getElementById('txt').value = currtxt.toLowerCase();
}
function cpytxt() {
    let currtxt = document.getElementById('txt').value;
    navigator.clipboard.writeText(currtxt);
}
function rmv() {
    let currtxt = document.getElementById('txt').value;
    let newText = currtxt.split(/[ ]+/);
    document.getElementById('txt').value = newText.join(" ");
}
function clrtxt() {
    document.getElementById('txt').value = "";
}
function txtsummary() {
    let currtxt = document.getElementById('txt').value;
    if (currtxt === "") {
        document.getElementById('txtsmry').innerText = "Nothing to Preview"
        document.getElementById('words').innerText = 0;
        document.getElementById('minsread').innerText = 0;
    }
    else {
        document.getElementById('txtsmry').innerText = currtxt;
        document.getElementById('words').innerText = currtxt.split(/\s+/).length;
        document.getElementById('minsread').innerText = (0.008 * currtxt.split(/\s+/).length).toFixed(2);
    }
    document.getElementById('characters').innerText = currtxt.length;
}
setInterval(() => {
    txtsummary();
}, 3)
// let currtxt = document.getElementById('txt').value;