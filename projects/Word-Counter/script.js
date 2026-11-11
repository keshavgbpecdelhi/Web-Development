const textInput = document.getElementById('textInput');
const wordCountEl = document.getElementById('wordCount');
const charCountEl = document.getElementById('charCount');
const charNoSpacesEl = document.getElementById('charNoSpaces');
const sentenceCountEl = document.getElementById('sentenceCount');
const paragraphCountEl = document.getElementById('paragraphCount');
const readingTimeEl = document.getElementById('readingTime');

const upperBtn = document.getElementById('upperBtn');
const lowerBtn = document.getElementById('lowerBtn');
const titleBtn = document.getElementById('titleBtn');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const toast = document.getElementById('toast');

function updateStats() {
  const text = textInput.value;

  // Characters
  const totalChars = text.length;
  const noSpaceChars = text.replace(/\s/g, '').length;

  // Words
  const wordsArray = text.trim().split(/\s+/).filter(w => w.length > 0);
  const totalWords = text.trim() === '' ? 0 : wordsArray.length;

  // Sentences
  const sentencesArray = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const totalSentences = text.trim() === '' ? 0 : sentencesArray.length;

  // Paragraphs
  const paragraphsArray = text.split(/\n+/).filter(p => p.trim().length > 0);
  const totalParagraphs = text.trim() === '' ? 0 : paragraphsArray.length;

  // Reading time (approx 200 words per minute)
  const readingSeconds = Math.ceil((totalWords / 200) * 60);
  let readingTimeStr = '0s';
  if (readingSeconds >= 60) {
    const mins = Math.floor(readingSeconds / 60);
    const secs = readingSeconds % 60;
    readingTimeStr = secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  } else if (readingSeconds > 0) {
    readingTimeStr = `${readingSeconds}s`;
  }

  wordCountEl.textContent = totalWords.toLocaleString();
  charCountEl.textContent = totalChars.toLocaleString();
  charNoSpacesEl.textContent = noSpaceChars.toLocaleString();
  sentenceCountEl.textContent = totalSentences.toLocaleString();
  paragraphCountEl.textContent = totalParagraphs.toLocaleString();
  readingTimeEl.textContent = readingTimeStr;
}

textInput.addEventListener('input', updateStats);

upperBtn.addEventListener('click', () => {
  textInput.value = textInput.value.toUpperCase();
  updateStats();
});

lowerBtn.addEventListener('click', () => {
  textInput.value = textInput.value.toLowerCase();
  updateStats();
});

titleBtn.addEventListener('click', () => {
  textInput.value = textInput.value.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
  updateStats();
});

copyBtn.addEventListener('click', async () => {
  if (!textInput.value) return;
  try {
    await navigator.clipboard.writeText(textInput.value);
    showToast('Copied to clipboard!');
  } catch (err) {
    textInput.select();
    document.execCommand('copy');
    showToast('Copied to clipboard!');
  }
});

clearBtn.addEventListener('click', () => {
  textInput.value = '';
  updateStats();
  textInput.focus();
});

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// Initial calculation
updateStats();
