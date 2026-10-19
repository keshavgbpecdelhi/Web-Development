(() => {
  const WORDS = (
    "about above across after again air all also always animal answer any around ask away back be because before " +
    "begin below between big book both bring build call came carry change city close color come could country " +
    "cut day different does door down draw drink each early earth easy eat end enough even every example eye " +
    "face family far father feel few field find first follow food form found friend from game gave get girl " +
    "give good great group grow hand hard have head hear help here high home house idea important keep kind " +
    "know land large last late learn leave left letter life light line little live long look made make many " +
    "may mean might mile miss more most mother mountain move music name near need never new next night note " +
    "number often old once only open other over own page paper part people picture place plant play point " +
    "press quick quiet read real river road room run said same school sea second see seem sentence set " +
    "should show side small some song soon sound spell start state still stop story study such sun take tell " +
    "than their them then there these thing think those thought three through time together too tree try " +
    "turn under until upon use very walk want watch water way well were what when where which while white " +
    "who why will with without word work world would write year young"
  ).split(" ");

  const $ = (id) => document.getElementById(id);
  const passageEl = $("passage");
  const inputEl = $("input");
  const stageEl = $("stage");
  const timeEl = $("time");
  const wpmEl = $("wpm");
  const accEl = $("accuracy");
  const bestEl = $("best");
  const resultEl = $("result");
  const lengthButtons = document.querySelectorAll(".length");

  let duration = 30;
  let target = "";
  let spans = [];
  let started = false;
  let finished = false;
  let startedAt = 0;
  let timerId = null;
  let keystrokes = 0;
  let mistakes = 0;

  const bestKey = () => "typing-speed-test-best-" + duration;

  function loadBest() {
    try {
      return Number(localStorage.getItem(bestKey())) || 0;
    } catch (e) {
      return 0;
    }
  }

  function saveBest(value) {
    try {
      localStorage.setItem(bestKey(), String(value));
    } catch (e) {
      /* storage unavailable: best score just won't persist */
    }
  }

  function buildPassage() {
    const words = [];
    while (words.length < 150) {
      const w = WORDS[Math.floor(Math.random() * WORDS.length)];
      if (w !== words[words.length - 1]) words.push(w);
    }
    target = words.join(" ");
    spans = [];
    passageEl.textContent = "";
    const frag = document.createDocumentFragment();
    words.forEach((word, i) => {
      const wordEl = document.createElement("span");
      wordEl.className = "word";
      const chars = i < words.length - 1 ? word + " " : word;
      for (const ch of chars) {
        const s = document.createElement("span");
        s.className = "ch";
        s.textContent = ch;
        wordEl.appendChild(s);
        spans.push(s);
      }
      frag.appendChild(wordEl);
    });
    passageEl.appendChild(frag);
    passageEl.scrollTop = 0;
  }

  function correctCount(value) {
    let n = 0;
    for (let i = 0; i < value.length; i++) if (value[i] === target[i]) n++;
    return n;
  }

  function accuracy() {
    return keystrokes ? Math.max(0, Math.round((1 - mistakes / keystrokes) * 100)) : 100;
  }

  function wpmFor(value, seconds) {
    if (seconds <= 0) return 0;
    return Math.round(correctCount(value) / 5 / (seconds / 60));
  }

  function render(value) {
    for (let i = 0; i < spans.length; i++) {
      let state = "";
      if (i < value.length) state = value[i] === target[i] ? " ok" : " bad";
      else if (i === value.length) state = " cur";
      spans[i].className = "ch" + state;
    }
    const cur = spans[value.length];
    if (cur) {
      const lineHeight = parseFloat(getComputedStyle(passageEl).lineHeight) || 40;
      passageEl.scrollTop = Math.max(0, cur.offsetTop - lineHeight);
    }
  }

  function tick() {
    const elapsed = (performance.now() - startedAt) / 1000;
    const left = Math.max(0, Math.ceil(duration - elapsed));
    timeEl.textContent = left;
    if (elapsed >= 1) wpmEl.textContent = wpmFor(inputEl.value, elapsed);
    if (elapsed >= duration) finish(duration);
  }

  function start() {
    started = true;
    startedAt = performance.now();
    timerId = setInterval(tick, 200);
  }

  function finish(seconds) {
    if (finished) return;
    finished = true;
    clearInterval(timerId);
    inputEl.blur();
    inputEl.disabled = true;

    const value = inputEl.value;
    const wpm = wpmFor(value, seconds);
    const acc = accuracy();
    const previousBest = loadBest();
    const isBest = wpm > previousBest;
    if (isBest) saveBest(wpm);

    timeEl.textContent = 0;
    wpmEl.textContent = wpm;
    accEl.textContent = acc + "%";
    bestEl.textContent = Math.max(wpm, previousBest);

    $("result-title").textContent = isBest && wpm > 0 ? "New personal best" : "Time's up";
    $("r-wpm").textContent = wpm + " WPM";
    $("r-acc").textContent = acc + "%";
    $("r-chars").textContent = correctCount(value);
    $("r-miss").textContent = mistakes;
    resultEl.hidden = false;
    $("again").focus();
  }

  function reset() {
    clearInterval(timerId);
    started = false;
    finished = false;
    keystrokes = 0;
    mistakes = 0;
    inputEl.disabled = false;
    inputEl.value = "";
    inputEl.maxLength = 0;
    resultEl.hidden = true;
    buildPassage();
    inputEl.maxLength = target.length;
    render("");
    timeEl.textContent = duration;
    wpmEl.textContent = 0;
    accEl.textContent = "100%";
    bestEl.textContent = loadBest();
    inputEl.focus();
  }

  inputEl.addEventListener("input", (e) => {
    if (finished) return;
    const value = inputEl.value;
    if (!started && value.length) start();

    if (e.inputType === "insertText" && value.length) {
      keystrokes++;
      if (value[value.length - 1] !== target[value.length - 1]) mistakes++;
    }

    render(value);
    accEl.textContent = accuracy() + "%";

    if (value.length >= target.length) {
      finish(Math.max((performance.now() - startedAt) / 1000, 1));
    }
  });

  inputEl.addEventListener("paste", (e) => e.preventDefault());
  stageEl.addEventListener("click", () => inputEl.focus());
  $("restart").addEventListener("click", reset);
  $("again").addEventListener("click", reset);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      reset();
    }
  });

  lengthButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      duration = Number(btn.dataset.seconds);
      lengthButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      reset();
    });
  });

  reset();
})();
