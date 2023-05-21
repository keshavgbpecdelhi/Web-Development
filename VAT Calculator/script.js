const calculateBtn = document.getElementById("calculate-btn");
const price = document.getElementById("price");
const vatPercent = document.getElementById("vat-percent");
const vatPrice = document.getElementById("vat-price");
const priceWithoutVAT = document.getElementById("price-without-vat");
const resetBtn = document.getElementById("reset-btn");

calculateBtn.addEventListener("click", function () {
    const vatPriceValue = (price.value * vatPercent.value) / 100;
    vatPrice.value = vatPriceValue;
    priceWithoutVAT.value = price.value - vatPrice.value;
});

resetBtn.addEventListener('click', () => {
    price.value = '';
    vatPercent.value = '';
    vatPrice.value = '';
    priceWithoutVAT.value = '';
});