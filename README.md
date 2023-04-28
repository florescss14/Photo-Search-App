# Photo Search App

This app is a photo display and search page that lets the user view both curated and searchable photos.
The app is a React frontend with a Node.js backend which is used to retireve API calls to Pexels and hides the secret key from the client.


## Installation

Need npm installed to run.

To start the server:
Start in home directory and run
```bash
npm install
npm start
```
This will start the server which masks the API key

To start the React project:

```bash
cd .\photo_search_app\
npm install
npm start
```

## Usage

App will start with 10 photos on the homepage by default. User can move to next and previous page using existing buttons.

User can search for photos of interest and photos will populate without refresh.

## Documention

### React

./photo_search_app/App.js contains the main bulk of the code. Contains methods for handling API call to the server. 

loadSearch and loadCurated will call the API and update the photos on the page. This is done when the search button is clicked, Photos per page is changed or currated button is clicked.

A call to the API will also occur when next or previous page is clicked by sending the respective url to the server. 

The Pexel API can be found [here](https://www.pexels.com/api/documentation/#photos)

Two Components Pagination and PhotoCard were created to manage the pagination as well as the photo cards.

### Node.js Server

Endpoints for the server can be found in the server/index.js file.

It contains the secret API key and uses Axios to send an HTTP API request.

The server exposed endpoints include:

-/api/curated calls the curated API on Pexel
-/api/search calls the search API on Pexel
-/api/path  Takes the url directly from the React project and calls the API

The reason for /path is that the url for the next and previous page is included in the inital API response. Thus when clicking the next or previous page we can call it directly.

The React project is run on PORT 3000 and the server is run at 3001. The React app uses a proxy to PORT 3001.