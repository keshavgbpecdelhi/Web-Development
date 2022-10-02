document.addEventListener("DOMContentLoaded", function() {
    var input = document.querySelector(".search");
    var btn = document.querySelector(".search + button");
    var form = document.querySelector("form");

    btn.onclick = function(e) {
        if (!(input.classList.contains("active"))){
            e.preventDefault();
            input.classList.add("active");
            input.focus();
        } else {
            form.submit();
        }
    };
});