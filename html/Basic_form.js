function validateInputs() {
  if (document.getElementById("address").value.trim().length === 0) {
    document.getElementById("address_error").style.display = "block";
  } else {
    document.getElementById("address_error").style.display = "none";
  }
  if (document.getElementById("city").value.trim().length === 0) {
    document.getElementById("city_error").style.display = "block";
  } else {
    document.getElementById("city_error").style.display = "none";
  }
  if (document.getElementById("zip").value.trim().length === 0) {
    document.getElementById("zip_error").style.display = "block";
  } else {
    document.getElementById("zip_error").style.display = "none";
  }
}

function validateCheckbox() {
  //   console.log("checkbox checked is ", maths.checked);
  if (
    !document.getElementById("maths").checked &&
    !document.getElementById("english").checked &&
    !document.getElementById("science").checked
  ) {
    document.getElementById("check").style.display = "block";
    return false;
  } else {
    document.getElementById("check").style.display = "none";
    return true;
  }
}

function validateRadio() {
  let radios = document.getElementsByName("Homework");
  let formValid = false;

  let i = 0;
  while (!formValid && i < radios.length) {
    if (radios[i].checked) {
      formValid = true;
    }
    i++;
  }

  if (!formValid) {
    document.getElementById("radio_check").style.display = "block";
  } else {
    document.getElementById("radio_check").style.display = "none";
  }
  return formValid;
}

// function validateSelect() {
//   let select = document.getElementById("class");
//   if (!select.value) {
//     document.getElementById("select_check").style.display = "block";
//   } else {
//     document.getElementById("select_check").style.display = "none";
//   }
// }

document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();
  validateInputs();
  validateCheckbox();
  validateRadio();
  // validateSelect();
});
