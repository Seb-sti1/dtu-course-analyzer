/**
 * This file retrieve the data from GitHub Pages and stores it in the local storage
 * It also defines the behaviour of when the user click on the app in the extension bar
 */

if (typeof chrome !== 'undefined') {
    browser = chrome
}

function fetchData() {
    let req = new Request("https://seb-sti1.github.io/dtu-course-analyzer/data.json", {
        method: 'GET',
        headers: {'Accept': 'application/json'},
        redirect: 'follow',
        referrer: 'client'
    });

    fetch(req).then(function (response) {
        // .json returns another promise
        return response.json();
    }).then(function (data) {
        console.debug("Data Refreshed")
        browser.storage.local.set({data: data}); // set storage for content-script
    }).catch(error => {
        console.log(error);
    });
}

fetchData();

browser.action.onClicked.addListener((tab) => {
    browser.tabs.create({url: 'https://seb-sti1.github.io/dtu-course-analyzer/'});
});