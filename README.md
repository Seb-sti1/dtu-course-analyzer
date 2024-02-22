# DTU Course Analyzer

So here it is, the brand new version of DTU Course Analyzer with data from the spring courses of 2023.
The extension is provided as is, with no guarentee nor responsibility for its stability and correctness. For more info,
see the license.

## Features

Data was gathered using a Python script that scraped DTU's course base and formatted it so that the extension can use
it.
The following is an explanation of how the values were calculated (higher is better)

* Average grade
* Average grade percentile: All courses are ranked against eachother based on average grade.
* Percent passed: The ratio of people who **attended** the exam that passed.
* Course rating percentile: All course are ranked based on the question "Overall I think the course is good" from course
  reviews.
* Workscore percentile: Ranked based on the question "5 points are allocated to 9h./week (45 h./week in the 3-week
  period). I think my workload in the course is [Much less..Much more]"
* Lazyscore: The average percentile between percent passed and workload. This is a metric for how much beer one can
  drink during a semester and still get decent grades. 🍺🍺🍺

## Installation

### Using Chrome/Mozilla stores (Currently outdated)

1. Chrome: https://chrome.google.com/webstore/detail/dtu-course-analyzer/bimhgdngikcnelkhjindmdghndfmdcde
2. Mozilla Firefox (This version is managed
   by [Mathias Herløv Lund](https://github.com/SalisMaxima)): https://addons.mozilla.org/en-US/firefox/addon/dtu-course-analyzer-2023

### Manual installation

Installation in Chrome:

1. Download: https://github.com/Seb-sti1/dtu-course-analyzer/releases/download/v2.0-beta/chrome.zip
2. In Chrome, go to the page: [chrome://extensions/](chrome://extensions/)
3. Enable developer mode
4. Click on "Load unpacked" and select the "extension" folder in what you downloaded in step 1.

Installation in Mozilla Firefox _(this procedure might change in the near future)_:

1. Download: https://github.com/Seb-sti1/dtu-course-analyzer/releases/download/v2.0-beta/firefox.zip
2. In Mozilla Firefox, go to the page: [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)
3. Click on "Load Temporary Add-on..." and select the "extension" folder in what you downloaded in step 1.

**Not maintained** Installation in Safari (iPhone and iPad):

1. Open the page https://testflight.apple.com/join/1yBrqMQQ
2. Follow the steps described on the page
3. Open the app
4. In Safari, press the "Aa" button in the address bar
5. Press "Manage Extensions" and enable the extension
6. Go to a course on kurser.dtu.dk
7. Press the "Aa" button in the address bar
8. Press DTU Course Analyzer and give it permission to modify kurser.dtu.dk

**Not maintained** Installation in Safari (Mac):

1. Open the page https://testflight.apple.com/join/1yBrqMQQ
2. Follow the steps described on the page
3. Open the app
4. In Safari, open settings
5. Go to the "Extensions" tab and enable the extension
6. Press "Manage Extensions" and enable the extension
7. Go to a course on kurser.dtu.dk
8. Press DTU Course Analyzer in the address bar and give it permission to modify kurser.dtu.dk"

## Development

TODOs:

- Speed up python scripts/pipeline
- Update JQuery
- Publish new extension

### Setup

1. Install python dependencies `pip3 install -r requirements.txt`

### Gather data

1. Create an env var called `SESSION_ID` containing the `ASP.NET_SessionId` cookie set when
   entering https://kurser.dtu.dk.
   Make sure there is no leading or trailing whitespace and newlines.
   If you are using Firefox, you can get the cookie by pressing F12, going to the storage tab, and copying the value of
   the `ASP.NET_SessionId` cookie.
2. Update the list of courses using `python3 getCourseNumbers.py`
3. Run the scraper `python3 scraper.py`
4. Analyze the data using `python3 analyzer.py`

### Extension's manifest

Due to Firefox currently not 
supporting [background.service_worker in Manifest V3](https://github.com/mozilla/web-ext/issues/2532#issuecomment-1285039773)
there is a slight difference in the `manifest.json`:

- For chrome

```json
"background": {
   "service_worker": "background.js"
},
```

- For Mozilla Firefox

```json
"background": {
   "scripts": ["background.js"]
},
```