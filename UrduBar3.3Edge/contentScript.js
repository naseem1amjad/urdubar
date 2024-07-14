//contentScript.js
var selectedColor="";
var selectedLanguage="";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.command === "changeTextboxColor") {
    selectedColor = message.color;
    selectedLanguage = message.selectedLanguage4Textbox;
    console.log("selectedColor = ", selectedColor);
	console.log("selectedLanguage = ", selectedLanguage);	
  }
});


function changeColorAndLanguage(event) {
	chrome.storage.local.get(['selectedLanguageInStorage', 'selectedColorInStorage'], function (result) {
  var selectedLanguage4Textbox = result.selectedLanguageInStorage;
  
  // Use the retrieved selected value as needed
  console.log("Retrieved selected value: ", selectedLanguage4Textbox);
  selectedLanguage=selectedLanguage4Textbox;
  selectedColor=result.selectedColorInStorage;
});
      var element = event.target;
      //element.style.backgroundColor = selectedColor;
	  element.style.border = "2px dotted "+selectedColor;
	
		disableUrduKeyboard(element);
		disableArabicKeyboard(element);
      if (selectedLanguage === "UR" || selectedLanguage === "FA") {
        enableUrduKeyboard(element);
      } else if (selectedLanguage === "AR") {
        enableArabicKeyboard(element);
	  }
	  else {
        disableUrduKeyboard(element);
		disableArabicKeyboard(element);
      }
    }// end of function changeColorAndLanguage

    var elements = document.querySelectorAll("input[type='text'],input[type='search'],[contenteditable='true'],textarea");
	console.log("querySelectorAll done!");
    elements.forEach(function (element) {
      element.addEventListener("click", changeColorAndLanguage);
    });
	
function enableArabicKeyboard(element) {
  element.addEventListener("keypress", convertToArabic);
}
	
function enableUrduKeyboard(element) {
  element.addEventListener("keypress", convertToUrdu);
}

function disableArabicKeyboard(element) {
  element.removeEventListener("keypress", convertToArabic);
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
    // Check if the keyCode is an arrow key
    return null;
  }

if (keyCode >= 32 && keyCode <= 126) {
    if (mapping[char]) {
      event.preventDefault();
      var element = event.target;
      var start, end, text;

     if (element.hasAttribute('contenteditable')) {
        // For elements with contenteditable="true"
        var selection = window.getSelection();
        start = selection.getRangeAt(0).startOffset;
        end = selection.getRangeAt(0).endOffset;
        text = element.textContent || element.innerText;
      } else {
		   // For input elements
        start = element.selectionStart;
        end = element.selectionEnd;
        text = element.value;		  
	  }

      var convertedChar = mapping[char];
      var convertedText = text.substring(0, start) + convertedChar + text.substring(end);

	if (element.hasAttribute('contenteditable')) {
        // Update the content of elements with contenteditable="true"
        if (element.textContent) {
          element.textContent = convertedText;
        } else {
          element.innerText = convertedText;
        }
      } else {
		  // Update the value of input elements
        element.value = convertedText;		  
	  }

      // Adjust the caret/selection position
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
}


function convertToArabic(event) {
  var mapping = {
    q: "ض",
    w: "ص",
    e: "ث",
    r: "ق",
    t: "ف",
    y: "غ",
    u: "ع",
    i: "ه",
    o: "خ",
    p: "ح",
    "[": "ج",
    "]": "د",
    a: "ش",
    s: "س",
    d: "ي",
    f: "ب",
    g: "ل",
    h: "ا",
    j: "ت",
    k: "ن",
    l: "م",
    ";": "ك",
    "'": "ط",
    z: "ئ",
    x: "ء",
    c: "ؤ",
    v: "ر",
    b: "لا",
    n: "ى",
    m: "ة",
    ",": "و",
    ".": "ز",
    "/": "ظ",
    Q: "َ",
    W: "ً",
    E: "ُ",
    R: "ٌ",
    T: "لإ",
    Y: "إ",
    U: "‘",
    I: "÷",
    O: "×",
    P: "؛",
    "{": "ِ",
    "}": "ٍ",
    A: "إ",
    S: "£",
    D: "ّ",
    F: "َ",
    G: "ٍ",
    H: "÷",
    J: "ْ",
    K: "لأ",
    L: "أ",
    ":": "؛",
    Z: "<",
    X: ">",
    C: "]",
    V: "[",
    B: "لآ",
    N: "آ",
    M: "’",
    "<": ",",
    ">": ".",
    "?": "؟",
	"/": "/",    
    "1": "١",
    "2": "٢",
    "3": "٣",
    "4": "٤",
    "5": "٥",
    "6": "٦",
    "7": "٧",
    "8": "٨",
    "9": "٩",
	"0": "٠",
    "-": "-",
    "=": "ـ",
    "`": "ْ",
    "~": "ّ",
    "!": "!",
    "@": "ـ",
    "#": "ـ",
    $: "$",
    "%": "٪",
    "^": "؟",
    "&": "×",
    "*": "*",
    "(": "(",
    ")": ")",
    _: "_",
    "+": "+",
    "|": "|",
    "\\": "\\",
    '"': "ـ",
    "'": "'",
    ",": ",",
    ".": ".",
    "/": "/",
    " ": " "
  };
  
 
  var keyCode = event.keyCode || event.which;
  var char = String.fromCharCode(keyCode);
  if ([37, 38, 39, 40].includes(keyCode)) {
    // Check if the keyCode is an arrow key
    return null;
  }

if (keyCode >= 32 && keyCode <= 126) {
  if (mapping[char]) {
    event.preventDefault();
    var input = event.target;
    var start = input.selectionStart;
    var end = input.selectionEnd;
    var text = input.value;

    var convertedChar = mapping[char];
    var convertedText = text.substring(0, start) + convertedChar + text.substring(end);
    input.value = convertedText;

  // Adjust the caret position
    var newCaretPosition = start + convertedChar.length;
    input.setSelectionRange(newCaretPosition, newCaretPosition);
  }
}
}

function convertToFarsi(event) {
  var mapping = {
    a: "ا",
    b: "ب",
    c: "پ",
    d: "ت",
    e: "ث",
    f: "ج",
    g: "چ",
    h: "ح",
    i: "خ",
    j: "د",
    k: "ذ",
    l: "ر",
    m: "ز",
    n: "ژ",
    o: "س",
    p: "ش",
    q: "ص",
    r: "ض",
    s: "ط",
    t: "ظ",
    u: "ع",
    v: "غ",
    w: "ف",
    x: "ق",
    y: "ک",
    z: "گ",
    A: "آ",
    B: "ٹ",
    C: "ث",
    D: "ج",
    E: "ح",
    F: "خ",
    G: "د",
    H: "ذ",
    I: "ڈ",
    J: "ر",
    K: "ز",
    L: "ڑ",
    M: "ژ",
    N: "س",
    O: "ش",
    P: "ص",
    Q: "ض",
    R: "ط",
    S: "ظ",
    T: "ع",
    U: "غ",
    V: "ف",
    W: "ق",
    X: "ک",
    Y: "گ",
    Z: "ل",
    "`": "ً",
    "~": "ً",
    "!": "!",
    "@": "ٹ",
    "#": "چ",
    $: "ے",
    "%": "پ",
    "^": "ُ",
    "&": "ڈ",
    "*": "پ",
    "(": "(",
    ")": ")",
    _: "ِ",
    "-": "ّ",
    "+": "َ",
    "{": "ّ",
    "}": "ْ",
    "[": "[",
    "]": "]",
    "|": "۔",
    "\\": "ﷺ",
    ":": "ک",
    ";": "ک",
    '"': "ـ",
    "'": "‘",
    "<": "َ",
    ">": "ِ",
    ",": "،",
    ".": "۔",
    "?": "؟",
    "/": "۔",
    "1": "۱",
    "2": "۲",
    "3": "۳",
    "4": "۴",
    "5": "۵",
    "6": "۶",
    "7": "۷",
    "8": "۸",
    "9": "۹",
    "0": "۰",
  };

  var keyCode = event.keyCode || event.which;
  var char = String.fromCharCode(keyCode);
  if ([37, 38, 39, 40].includes(keyCode)) {
    // Check if the keyCode is an arrow key
    return null;
  }

  if (keyCode >= 32 && keyCode <= 126) {
    if (mapping[char]) {
      event.preventDefault();
      var input = event.target;
      var start = input.selectionStart;
      var end = input.selectionEnd;
      var text = input.value;

      var convertedChar = mapping[char];
      var convertedText = text.substring(0, start) + convertedChar + text.substring(end);
      input.value = convertedText;

      // Adjust the caret position
      var newCaretPosition = start + convertedChar.length;
      input.setSelectionRange(newCaretPosition, newCaretPosition);
    }
  }
}



