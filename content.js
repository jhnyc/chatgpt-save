var getThreads = () => {
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
    return [promptData, responseData];
};

// create csv from prompt & response arrays
var createCSVBlob = (data) => {
    const prompt = data[0];
    const resp = data[1];
    const csvHeader = "Prompt,Response\n";
    var csvString = prompt
        .map(
            (p, i) =>
            `"${p.replaceAll('"', '""')}","${resp[i].replaceAll('"', '""')}"`
        ) // handle comma, quote, line break
        .join("\n");
    var csvBlob = new Blob([csvHeader + csvString], { type: "text/csv" });
    return csvBlob;
};

var threads2CSV = () => {
    var threads = getThreads();
    var csvBlob = createCSVBlob(threads);
    var url = URL.createObjectURL(csvBlob);
    var temp = document.createElement("a");
    temp.href = url;
    temp.download = "ChatGPT_History.csv";
    document.body.appendChild(temp);
    temp.click();
    document.body.removeChild(temp);
};

threads2CSV();