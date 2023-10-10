import Cookies from "js-cookie";

// to get credential data
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.username && request.password) {
    const username = request.username;
    const password = request.password;

    console.log("Received username:", username);
    console.log("Received password:", password);
    Cookies.set("extUsername", username && username);

    // Set a flag in chrome.storage.local to indicate the user is authenticated
    chrome.storage.local.set({ isAuthenticated: true }, () => {
      console.log("User is authenticated. Flag set in chrome.storage.local");
    });
    // Send a response back to the popup script
    sendResponse({ message: "Form data received and processed." });
    console.log("login success");
  } else {
    console.log("failed");
  }
});

// test button
chrome.runtime.onMessage.addListener((message) => {
  if (message.action == "showThirdParty") {
    console.log("catch button working");
    console.log(Math.random());
  }
});

const getRandomNumber = () => {
  const random = Math.random();

  const randomNumber = Math.floor(random * 899);

  return randomNumber;
};

// to fetch pokemon
chrome.runtime.onMessage.addListener(async (res, req, sendResponse) => {
  if (res.message === "FETCH") {
    const id = await getRandomNumber();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    console.log("fetch running");

    chrome.storage.local.set({ PokemonData: data }, async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (typeof tab.id === "number") {
        chrome.tabs.sendMessage(tab.id, { message: "manuke wes kecekel" });
      }
    });
  }
});

// log when pop up mounted
chrome.runtime.onMessage.addListener((request: { popupMounted: boolean }) => {
  // Log statement if request.popupMounted is true
  if (request.popupMounted) {
    console.log("backgroundPage notified that Popup.tsx has mounted.");
  }
});

// test content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "performAction") {
    console.log("manok");
    sendResponse({ result: "Action completed in the background script" });
  }
});
//test content script
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs: any) {
  chrome.tabs.sendMessage(
    tabs && tabs[0].id,
    { greeting: "hello" },
    function (response) {
      console.log(response);
    }
  );
});
