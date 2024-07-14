// background.js

var selectedColor = "grey";

// Set browser API based on the browser type (Chrome or Firefox)
var browserAPI = chrome || browser;

browserAPI.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.command === "changeTextboxColor") {
    selectedColor = message.color;
    var selectedLanguage = message.selectedLanguage4Textbox;
    setBadgeText(selectedLanguage.toString());
    setBadgeBackgroundColor(selectedColor);
    console.log("selectedColor = ", selectedColor);
    console.log("selectedLanguage = ", selectedLanguage);
  } else {
    console.log("Message received but command is not 'changeTextboxColor'");
  }
  console.log("Outside IF command=changeTextboxColor");
});

// Set browser action badge text
function setBadgeText(text) {
 if (typeof browser !== "undefined" && browser.extension) {
	 //FF
    browserAPI.browserAction.setBadgeText({ text: text });
  } else if (typeof chrome !== "undefined" && chrome.extension) {
	 //Chrome
    chrome.action.setBadgeText({ text: text });
  }
}

// Set browser action badge background color
function setBadgeBackgroundColor(color) {
  if (typeof browser !== "undefined" && browser.extension) {
	  //FF
    browserAPI.browserAction.setBadgeBackgroundColor({ color: color });
  }  else if (typeof chrome !== "undefined" && chrome.extension) {
	  //Chrome
    chrome.action.setBadgeBackgroundColor({ color: color });
  }
}

console.log("Background running.");
