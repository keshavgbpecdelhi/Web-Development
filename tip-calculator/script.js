document.getElementById('calculate-btn').addEventListener('click', function () {
  const bill = parseFloat(document.getElementById('bill').value);
  const tipPercent = parseFloat(document.getElementById('tip').value);
  const people = parseInt(document.getElementById('people').value);

  if (isNaN(bill) || bill <= 0 || isNaN(people) || people <= 0) {
    alert('Please enter valid positive numbers for Bill and People.');
    return;
  }

  const validTip = isNaN(tipPercent) ? 0 : tipPercent;
  const totalTip = bill * (validTip / 100);
  const grandTotal = bill + totalTip;
  const totalPerPerson = grandTotal / people;

  document.getElementById('tip-amount').innerText = `$${totalTip.toFixed(2)}`;
  document.getElementById('total-per-person').innerText = `$${totalPerPerson.toFixed(2)}`;
});