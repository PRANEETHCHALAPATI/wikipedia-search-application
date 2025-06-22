let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndDisplayItem(item) {

    let {
        description,
        link,
        title
    } = item;

    let resultContainer = document.createElement("div");
    searchResults.classList.add("result-container");
    searchResults.appendChild(resultContainer);

    let resultTitle = document.createElement("h1");
    resultTitle.textContent = title;
    resultTitle.classList.add("result-title");
    let a1 = document.createElement("a");
    a1.href = link;
    a1.appendChild(resultTitle);
    resultContainer.appendChild(a1);

    let resultUrl = document.createElement("p");
    resultUrl.textContent = link;
    resultUrl.classList.add("result-url");
    let a2 = document.createElement("a");
    a2.href = link;
    a2.appendChild(resultUrl);
    resultContainer.appendChild(a2);

    let resultDescription = document.createElement("p");
    resultDescription.textContent = description;
    resultDescription.classList.add("result-description");
    resultContainer.appendChild(resultDescription);

    let br1 = document.createElement("br");
    resultContainer.appendChild(br1);
}


function displayResults(search_results) {
    spinner.classList.toggle("d-none");
    for (let item of search_results) {
        createAndDisplayItem(item);
    }
}


function fetchFromWiki(event) {

    if (event.key === "Enter") {
        searchResults.textContent = "";
        spinner.classList.toggle("d-none");
        let value = searchInput.value;
        searchInput.value = "";
        let url = "https://apis.ccbp.in/wiki-search?search=" + value;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                let {
                    search_results
                } = data;
                displayResults(search_results);
            });
    }
}


searchInput.addEventListener("keydown", fetchFromWiki);