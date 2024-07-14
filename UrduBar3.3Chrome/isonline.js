function isBrowserOnline() {
  if (typeof navigator.onLine !== 'undefined') {
    return navigator.onLine;
  } else {
    // For older versions of Firefox
    return navigator.connection && navigator.connection.type !== 'none';
  }
}

function checkWebpageAvailability(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('HEAD', url);
  xhr.onload = function() {
    callback(xhr.status === 200);
  };
  xhr.onerror = function() {
    callback(false);
  };
  xhr.send();
}

document.addEventListener('DOMContentLoaded', function() {
  var statusMessage = document.getElementById('statusMessage');
  var webpageUrl = 'https://www.ajsoftpk.com/urdubar/notepad4urdubar/';

  if (isBrowserOnline()) {
    checkWebpageAvailability(webpageUrl, function(isAvailable) {
      if (isAvailable) {
        statusMessage.textContent = 'Notepad4UrduBar is accessible. Redirecting...';
        window.location.href = webpageUrl;
      } else {
        statusMessage.textContent = 'Notepad4UrduBar is inaccessible, contact urdujini@gmail.com';
      }
    });
  } else {
    statusMessage.textContent = 'Web browser is offline';
  }
});
