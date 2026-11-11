const textInput = document.getElementById('textInput');
const fgColor = document.getElementById('fgColor');
const bgColor = document.getElementById('bgColor');
const sizeSelect = document.getElementById('sizeSelect');
const qrcodeContainer = document.getElementById('qrcode');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');

let qrInstance = null;

function generateQR() {
  const text = textInput.value.trim();
  if (!text) {
    alert('Please enter text or a URL to generate a QR code.');
    textInput.focus();
    return;
  }

  const size = parseInt(sizeSelect.value, 10) || 220;

  qrcodeContainer.innerHTML = '';

  qrInstance = new QRCode(qrcodeContainer, {
    text: text,
    width: size,
    height: size,
    colorDark: fgColor.value,
    colorLight: bgColor.value,
    correctLevel: QRCode.CorrectLevel.H
  });
}

function downloadQR() {
  const img = qrcodeContainer.querySelector('img');
  const canvas = qrcodeContainer.querySelector('canvas');

  let dataUrl = null;
  if (canvas) {
    dataUrl = canvas.toDataURL('image/png');
  } else if (img && img.src) {
    dataUrl = img.src;
  }

  if (!dataUrl) {
    alert('Please generate a QR code first.');
    return;
  }

  const downloadLink = document.createElement('a');
  downloadLink.href = dataUrl;
  downloadLink.download = 'qrcode.png';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

generateBtn.addEventListener('click', generateQR);
downloadBtn.addEventListener('click', downloadQR);

fgColor.addEventListener('change', generateQR);
bgColor.addEventListener('change', generateQR);
sizeSelect.addEventListener('change', generateQR);

textInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    generateQR();
  }
});

// Initial generation
generateQR();
