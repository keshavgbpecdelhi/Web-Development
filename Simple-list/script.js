let list = [];

var button = document.getElementById('btn');
var rList = document.getElementById('list');

button.addEventListener('click', function (event) {
    var input = document.getElementById('input');
    list.push(input.value);
    input.value = '';
    var li = document.createElement('li');
    li.innerHTML = list.slice(-1);
    rList.appendChild(li)
});