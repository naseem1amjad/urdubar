var selectedColor = "";
var selectedLanguage = "";

// Listen for messages from the background script
browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.command === "changeTextboxColor") {
    selectedColor = message.color;
    selectedLanguage = message.selectedLanguage4Textbox;
    console.log("Selected Color:", selectedColor);
    console.log("Selected Language:", selectedLanguage);
  }
});

// Function to update text box styles and enable keyboard
function changeColorAndLanguage(event) {
  browser.storage.local.get(['selectedLanguageInStorage', 'selectedColorInStorage'], function (result) {
    selectedLanguage = result.selectedLanguageInStorage;
    selectedColor = result.selectedColorInStorage;
  });

  var element = event.target;
  element.style.border = "2px dotted " + selectedColor;

  disableUrduKeyboard(element);
  disableArabicKeyboard(element);

  if (selectedLanguage === "UR" || selectedLanguage === "FA") {
    enableUrduKeyboard(element);
  } else if (selectedLanguage === "AR") {
    enableArabicKeyboard(element);
  } else {
    disableUrduKeyboard(element);
    disableArabicKeyboard(element);
  }
}

// Attach event listeners dynamically
function attachEventListeners() {
  var elements = document.querySelectorAll("input[type='text'], input[type='search'], textarea, div[contenteditable='true']");
  console.log("QuerySelectorAll executed: Found", elements.length, "elements");

  elements.forEach(function (element) {
    element.removeEventListener("focus", changeColorAndLanguage);
    element.addEventListener("focus", changeColorAndLanguage);
  });
}

// Observe DOM changes to handle dynamic text boxes (like ChatGPT)
const observer = new MutationObserver(() => {
  attachEventListeners();
});
observer.observe(document.body, { childList: true, subtree: true });

// Urdu Keyboard Handling
function enableUrduKeyboard(element) {
  element.addEventListener("keypress", convertToUrdu);
}
function disableUrduKeyboard(element) {
  element.removeEventListener("keypress", convertToUrdu);
}

function convertToUrdu(event) {
  var mapping = {
    a: "ا",
    b: "ب",
    c: "چ",
    d: "د",
    e: "ع",
    f: "ف",
    g: "گ",
    h: "ھ",
    i: "ی",
    j: "ج",
    k: "ک",
    l: "ل",
    m: "م",
    n: "ن",
    o: "ہ",
    p: "پ",
    q: "ق",
    r: "ر",
    s: "س",
    t: "ت",
    u: "ء",
    v: "ط",
    w: "و",
    x: "ش",
    y: "ے",
    z: "ز",
    A: "آ",
    B: "ؓ",
    C: "ث",
    D: "ڈ",
    E: "ؑ",
    F: "ٖ",
    G: "غ",
    H: "ح",
    I: "ٰ",
    J: "ض",
    K: "خ",
    L: "ؒ",
    M: "إ",
    N: "ں",
    O: "ۃ",
    P: "ُ",
    Q: "ْ",
    R: "ڑ",
    S: "ص",
    T: "ٹ",
    U: "ٗ",
    V: "ظ",
    W: "ﷺ",
    X: "ژ",
    Y: "؁",
    Z: "ذ",
    "`": "ٍ",
    "~": "ً",
    "!": "!",
    "@": "،",
    "#": "؍",
    $: "ء",
    "%": "ي",
    "^": "ؐ",
    "&": "&",
    "*": "ٌ",
    "(": "(",
    ")": ")",
    _: "ّ",
    "-": "ٴ",
    "+": "آ",
    "=": "ؤ",
    "{": "‘",
    "}": "’",
    "[": "[",
    "]": "]",
    "|": "ؔ",
    "\\": "؎",
    ":": ":",
    ";": "؛",
    '"': 'ـ',
    "'": "۔",
    "<": "ِ",
    ">": "َ",
    ",": "،",
    ".": "۔",
    "?": "؟",
    "/": "۔",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
  };


  var keyCode = event.keyCode || event.which;
  var char = String.fromCharCode(keyCode);

  if ([37, 38, 39, 40].includes(keyCode)) {
    return;
  }

  if (mapping[char]) {
    event.preventDefault();
    insertTextAtCursor(event.target, mapping[char]);
  }
}

// Arabic Keyboard Handling
function enableArabicKeyboard(element) {
  element.addEventListener("keypress", convertToArabic);
}
function disableArabicKeyboard(element) {
  element.removeEventListener("keypress", convertToArabic);
}

function convertToArabic(event) {
  var mapping = {
    q: "ض", w: "ص", e: "ث", r: "ق", t: "ف", y: "غ", u: "ع", i: "ه", o: "خ", p: "ح",
    a: "ش", s: "س", d: "ي", f: "ب", g: "ل", h: "ا", j: "ت", k: "ن", l: "م", ";": "ك"
  };

  var keyCode = event.keyCode || event.which;
  var char = String.fromCharCode(keyCode);

  if ([37, 38, 39, 40].includes(keyCode)) {
    return;
  }

  if (mapping[char]) {
    event.preventDefault();
    insertTextAtCursor(event.target, mapping[char]);
  }
}

// Function to insert text at cursor position
function insertTextAtCursor(element, text) {
  if (element.isContentEditable) {
    document.execCommand("insertText", false, text);
  } else {
    var start = element.selectionStart;
    var end = element.selectionEnd;
    var value = element.value;

    element.value = value.substring(0, start) + text + value.substring(end);
    element.setSelectionRange(start + text.length, start + text.length);
  }
}
