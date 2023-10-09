chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.username && request.password) {
    const username = request.username;
    const password = request.password;

    console.log("Received username:", username);
    console.log("Received password:", password);

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

chrome.runtime.onMessage.addListener((message) => {
  if (message.action == "showThirdParty") {
    console.log("catch button working");
    console.log(Math.random());
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }

      const activeTab = tabs[0];
      if (!activeTab) {
        console.error("No active tab found.");
        return;
      }

      chrome.scripting.executeScript(
        {
          // @ts-ignore
          target: { tabId: activeTab.id },
          function: () => {
            // This code will be executed in the content script
            chrome.runtime.sendMessage({
              action: "updateState",
              newState: true,
            });
          },
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
          }
        }
      );
    });
  }
});

chrome.runtime.onMessage.addListener((request: { popupMounted: boolean }) => {
  // Log statement if request.popupMounted is true
  if (request.popupMounted) {
    console.log("backgroundPage notified that Popup.tsx has mounted.");
  }
});
