// Content Script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "showComponent") {
    // Create and display your component here
    const component = document.createElement("div");
    component.textContent = "This is the component from the content script!";
    component.style.position = "fixed";
    component.style.top = "50%";
    component.style.left = "50%";
    component.style.transform = "translate(-50%, -50%)";
    component.style.backgroundColor = "white";
    component.style.padding = "10px";
    component.style.border = "1px solid black";
    document.body.appendChild(component);
  }
});
