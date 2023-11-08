let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


function createAndAppendSearch(results) {
    let {
        link,
        title,
        description
    } = results;
    //1.div -- result-item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);

    //2.anchor ---result-title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.href = link;
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.target = "_blank";


    resultItemEl.appendChild(resultTitleEl);
    //3.break 

    let resultBreak = document.createElement("br");
    resultItemEl.appendChild(resultBreak);

    //4.anchor --result-url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.textContent = link;
    urlEl.target = "_blank";
    urlEl.href = link;

    resultItemEl.appendChild(urlEl);

    //link-break
    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    //link-description
    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    resultItemEl.appendChild(descriptionEl);

}


function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");

    for (let results of searchResults) {
        createAndAppendSearch(results);
    }

}

function searchWikipedia(event) {
    if (event.key === "Enter") {

        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });


    }

}
searchInputEl.addEventListener("keydown", searchWikipedia);