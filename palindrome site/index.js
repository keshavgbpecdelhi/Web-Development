const txtInput = document.getElementById("infield");
const btn = document.getElementsByClassName("btn");
let filterinput;
let reverse;
const infoTxt = document.querySelector(".text-info");

$("input").keyup(() => {
  filterinput = txtInput.value.toLowerCase().replace(/[^A-Z0-9]/gi, "");
  if ($("#infield").val() != "") {
    return $("button").addClass("active");
  } else {
    $("button").removeClass("active");
  }
});

$("button").click(() => {
  reverse = filterinput.split("").reverse().join("");
  infoTxt.style.display = "block";

  if (filterinput != reverse) {
    return (
      (infoTxt.innerHTML = `No, <span>'${txtInput.value}'</span> isn't a Palindrome !`),
      (txtInput.value = "")
    );
  } 

  else {
    return (
      (infoTxt.innerHTML = `Yes, <span>'${txtInput.value}'</span> is a Palindrome !`),
      (txtInput.value = "")
    );
  }
});
