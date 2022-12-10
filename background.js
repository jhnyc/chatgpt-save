// execute content script to parse prompts & responses
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, { file: "content.js" });
});

// listener for the message and a function to return the HTML of the page
chrome.runtime.onMessage.addListener(function(request, sender, response) {
    if (request.type == "result") {
        console.log(request);
        var csvBlob = createCSVBlob(request.data);
        chrome.downloads.download({
            url: URL.createObjectURL(csvBlob),
            filename: "ChatGPT_History.csv",
        });
    }
});

// create csv from prompt & response arrays
const createCSVBlob = (data) => {
    const prompt = data[0];
    const resp = data[1];
    const csvHeader = "prompt,response\n";
    var csvString = prompt
        .map((p, i) => `${p},"${resp[i].replaceAll('"', '""')}"`) // handle comma,quote,line break
        .join("\n");
    console.log(csvString);
    var csvBlob = new Blob([csvHeader + csvString], { type: "text/csv" });
    return csvBlob;
};