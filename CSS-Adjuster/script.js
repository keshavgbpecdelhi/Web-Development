// Taking NodeList(Sort of array) of Array
const inputs = document.querySelectorAll(".controls input");

function handleUpdate() {
  const suffix = this.dataset.sizing || "";
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + suffix
  );
}

inputs.forEach((input) => input.addEventListener("change", handleUpdate));
// For Smooth functioning
inputs.forEach((input) => input.addEventListener("mousemove", handleUpdate));