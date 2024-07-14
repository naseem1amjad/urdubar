//popup.js
document.addEventListener("DOMContentLoaded", function () {
  var colorButtonsContainer = document.getElementById("colorButtons");
 
  var colors = [
    { color: "white", text: "EN" },
    { color: "lightgreen", text: "UR" },
    { color: "yellow", text: "AR" },
    { color: "skyblue", text: "FA" }    
  ];

  colors.forEach(function (colorData) {
    var button = document.createElement("button");
    button.classList.add("button");
    button.style.backgroundColor = colorData.color;
    button.textContent = colorData.text;

    button.addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { command: "changeTextboxColor", color: colorData.color, selectedLanguage4Textbox: colorData.text });
      });
      chrome.storage.local.set({ selectedLanguageInStorage: colorData.text, selectedColorInStorage: colorData.color }, function () {
        //console.log("Selected value saved: ", selectedLanguageInStorage);
      });
      chrome.runtime.sendMessage({ command: "changeTextboxColor", color: colorData.color, selectedLanguage4Textbox: colorData.text });
    });

    colorButtonsContainer.appendChild(button);
	colorButtonsContainer.appendChild(document.createElement("br")); // Add a line break
  });
  
  var NotepadButton = document.createElement("button");
  NotepadButton.classList.add("button");
  NotepadButton.style.backgroundColor = "white";
  NotepadButton.textContent = "[=]";
  NotepadButton.addEventListener("click", function () {
  if (typeof browser !== "undefined" && browser.extension) {
  // Code for Firefox
		browser.tabs.create({ url: browser.runtime.getURL("isonline.html") });
	} else if (typeof chrome !== "undefined" && chrome.extension) {
	  // Code for Chrome
		chrome.tabs.create({ url: chrome.runtime.getURL("isonline.html") });
	}

  });
  colorButtonsContainer.appendChild(NotepadButton);
  colorButtonsContainer.appendChild(document.createElement("br")); // Add a line break

  var helpButton = document.createElement("button");
  helpButton.classList.add("button");
  helpButton.style.backgroundColor = "lightgray";
  helpButton.textContent = "?";  
  
  helpButton.addEventListener("click", function () {
  var urls = [
	"https://www.ajsoftpk.com/urdubar/",
    "https://www.urdujini.com/",
    "https://www.ajsoftpk.com/naseem_amjad/",
    "https://www.ajsoftpk.com/",
    "https://www.ajsoftpk.com/naseem_amjad/urdu/",
    "https://www.ajsoftpk.com/urdubar/"
  ];

  var randomIndex = Math.floor(Math.random() * urls.length);
  var randomURL = urls[randomIndex];

  chrome.tabs.create({ url: randomURL });
});


  colorButtonsContainer.appendChild(helpButton);
});
