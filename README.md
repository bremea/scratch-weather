# scratch-weather
Back-end code for a weather app on Scratch. https://scratch.mit.edu/projects/424990547/

## How to use
Clone the repo to your computer and make sure you have node/npm installed. Open it in the terminal. Run `npm i scratch-api` and `npm i weather-js`. Open up `index.js` and change line 4 to:
```js
scratch.UserSession.create('your-scratch-username-here', 'your-scratch-password-here', function (err, user) {
```
Change line 5 to:
```js
user.cloudSession('your-scratch-project-id-here', function (err, cloud) {
```
Keep in mind you'll have to have the "Scratcher" status to use this. Save index.js and run `node index.js`.
