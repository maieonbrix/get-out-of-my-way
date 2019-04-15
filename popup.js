let GOFMW = function() {
  return {
    value: false,
    listeners: [],
    setValue(value) {
      this.value = value;
      this.listeners.forEach(l => l(value));
    },
    subscribe(listener) {
      this.listeners.push(listener);
      let index = this.listeners.length - 1;

      return () => {
        this.listeners.splice(index + 1);
      };
    },
    getValue() {
      return this.value;
    }
  };
};

let controller = new GOFMW();
let getOutOfMyWayButton = document.getElementById("GOFMW");

controller.subscribe(value => {
  if (value === true) {
    getOutOfMyWayButton.style.backgroundColor = "green";
  } else {
    getOutOfMyWayButton.style.backgroundColor = "red";
  }
});

// chrome.storage.sync.get(["GOFMW_MODE_ENABLED"], function(result) {
//   let value = result.key;

//   if (value != null) {
//     controller.setValue(value);
//   } else {
//     controller.setValue(false);
//   }
// });

function toggleGetOutOfMyWayMode() {
  let currentValue = controller.getValue();
  let nextValue = !currentValue;

  controller.setValue(nextValue);

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript({
      file: "GOFMW.js"
    });
  });
}

getOutOfMyWayButton.addEventListener("click", toggleGetOutOfMyWayMode);

// "content_scripts": [
//     {
//       "matches": [
//         //match patterns when the content script will be used
//         "http://*/*",
//         "https://*/*"
//       ],
//       "js": ["GOFMW.js"],
//       //specifies when the script should run
//       "run_at": "document_end"
//     }
//   ]
