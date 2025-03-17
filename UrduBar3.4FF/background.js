var selectedColor = "grey";

// Set browser API based on the browser type (Chrome or Firefox)
var browserAPI = typeof browser !== "undefined" ? browser : chrome;

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
  browserAPI.action.setBadgeText({ text: text });
}

// Set browser action badge background color
function setBadgeBackgroundColor(color) {
  browserAPI.action.setBadgeBackgroundColor({ color: color });
}

console.log("Background running.");
