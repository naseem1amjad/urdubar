var selectedColor = "";
var selectedLanguage = "";

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.command === "changeTextboxColor") {
    selectedColor = message.color;
    selectedLanguage = message.selectedLanguage4Textbox;
    console.log("selectedColor = ", selectedColor);
    console.log("selectedLanguage = ", selectedLanguage);
  }
});

// Function to update text box styles and keyboard handling
function changeColorAndLanguage(event) {
  chrome.storage.local.get(['selectedLanguageInStorage', 'selectedColorInStorage'], function (result) {
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

// Attach event listeners for text fields (including ChatGPT)
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

// ✅ **Keypress-based Urdu Keyboard Handling**
function enableUrduKeyboard(element) {
  element.addEventListener("keypress", convertToUrdu);
}
function disableUrduKeyboard(element) {
  element.removeEventListener("keypress", convertToUrdu);
}

function convertToUrdu(event) {
  var mapping = {
    a: "ا", b: "ب", c: "چ", d: "د", e: "ع", f: "ف", g: "گ", h: "ھ", i: "ی", j: "ج", k: "ک", l: "ل",
    m: "م", n: "ن", o: "ہ", p: "پ", q: "ق", r: "ر", s: "س", t: "ت", u: "ء", v: "ط", w: "و", x: "ش",
    y: "ے", z: "ز", A: "آ", B: "ؓ", C: "ث", D: "ڈ", E: "ؑ", F: "ٖ", G: "غ", H: "ح", I: "ٰ", J: "ض",
    K: "خ", L: "ؒ", M: "إ", N: "ں", O: "ۃ", P: "ُ", Q: "ْ", R: "ڑ", S: "ص", T: "ٹ", U: "ٗ", V: "ظ",
    W: "ﷺ", X: "ژ", Y: "؁", Z: "ذ"
  };

  var keyCode = event.keyCode || event.which;
  var char = String.fromCharCode(keyCode);

  if ([37, 38, 39, 40].includes(keyCode)) {
    return; // Ignore arrow keys
  }

  if (mapping[char]) {
    event.preventDefault();
    var element = event.target;
    var start, end, text;

    if (element.hasAttribute('contenteditable')) {
      var selection = window.getSelection();
      start = selection.getRangeAt(0).startOffset;
      end = selection.getRangeAt(0).endOffset;
      text = element.textContent || element.innerText;
    } else {
      start = element.selectionStart;
      end = element.selectionEnd;
      text = element.value;
    }

    var convertedChar = mapping[char];
    var convertedText = text.substring(0, start) + convertedChar + text.substring(end);

    if (element.hasAttribute('contenteditable')) {
      element.textContent = convertedText;
    } else {
      element.value = convertedText;
    }

    if (element.hasAttribute('contenteditable')) {
      var range = document.createRange();
      var node = element.firstChild;
      range.setStart(node, start + convertedChar.length);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      element.setSelectionRange(start + convertedChar.length, start + convertedChar.length);
    }
  }
}

// ✅ **Keypress-based Arabic Keyboard Handling**
function enableArabicKeyboard(element) {
  element.addEventListener("keypress", convertToArabic);
}
function disableArabicKeyboard(element) {
  element.removeEventListener("keypress", convertToArabic);
}

function convertToArabic(event) {
  var mapping = {
    q: "ض", w: "ص", e: "ث", r: "ق", t: "ف", y: "غ", u: "ع", i: "ه", o: "خ", p: "ح", "[": "ج", "]": "د",
    a: "ش", s: "س", d: "ي", f: "ب", g: "ل", h: "ا", j: "ت", k: "ن", l: "م", ";": "ك", "'": "ط",
    z: "ئ", x: "ء", c: "ؤ", v: "ر", b: "لا", n: "ى", m: "ة", ",": "و", ".": "ز", "/": "ظ"
  };

  var keyCode = event.keyCode || event.which;
  var char = String.fromCharCode(keyCode);

  if ([37, 38, 39, 40].includes(keyCode)) {
    return; // Ignore arrow keys
  }

  if (mapping[char]) {
    event.preventDefault();
    var element = event.target;
    var start = element.selectionStart;
    var end = element.selectionEnd;
    var text = element.value;

    var convertedChar = mapping[char];
    var convertedText = text.substring(0, start) + convertedChar + text.substring(end);
    element.value = convertedText;

    var newCaretPosition = start + convertedChar.length;
    element.setSelectionRange(newCaretPosition, newCaretPosition);
  }
}
