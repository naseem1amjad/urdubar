var selectedColor = "grey";

// Set browser API based on the browser type (Chrome or Firefox)
var browserAPI = chrome || browser;

browserAPI.runtime.onInstalled.addListener(() => {
  // Inject content script into all active tabs when extension is installed/updated
  chrome.tabs.query({}, function (tabs) {
    for (let tab of tabs) {
      if (tab.url && tab.url.startsWith("http")) { // Ensure we inject only on HTTP/HTTPS pages
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["contentScript.js"]
        });
      }
    }
  });
});

browserAPI.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.command === "changeTextboxColor") {
    selectedColor = message.color;
    var selectedLanguage = message.selectedLanguage4Textbox;
    setBadgeText(selectedLanguage.toString());
    setBadgeBackgroundColor(selectedColor);
    console.log("Selected Color:", selectedColor);
    console.log("Selected Language:", selectedLanguage);
  } else {
    console.log("Message received but command is not 'changeTextboxColor'");
  }
});

// Function to set the browser action badge text
function setBadgeText(text) {
  if (typeof browser !== "undefined" && browser.extension) {
    browserAPI.browserAction.setBadgeText({ text: text });
  } else if (typeof chrome !== "undefined" && chrome.extension) {
    chrome.action.setBadgeText({ text: text });
  }
}

// Function to set the browser action badge background color
function setBadgeBackgroundColor(color) {
  if (typeof browser !== "undefined" && browser.extension) {
    browserAPI.browserAction.setBadgeBackgroundColor({ color: color });
  } else if (typeof chrome !== "undefined" && chrome.extension) {
    chrome.action.setBadgeBackgroundColor({ color: color });
  }
}

console.log("Background script running.");
