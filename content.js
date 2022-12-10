// get document elements of all prompts & responses
var prompt = document.getElementsByClassName(
    "w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-gray-800"
);

var response = document.getElementsByClassName(
    "w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group bg-gray-50 dark:bg-[#444654]"
);

// extract text from prompts & responses HTML elements
var promptData = Array.from(prompt).map((i) => i.textContent);
var responseData = Array.from(response).map((i) => i.textContent);

// send data to background.js
chrome.runtime.sendMessage({
    type: "result",
    data: [promptData, responseData],
});