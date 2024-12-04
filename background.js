chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
    });
});

chrome.runtime.connect().onDisconnect.addListener(() => {
    console.log("Disconnected");
});