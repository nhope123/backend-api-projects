// index.js
// where your node app starts

// Timestamp requirements 
// 1. You should provide your own project, not the example URL.
// 2. A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
// 3. A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
// 4. A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
// 5. Your project can handle dates that can be successfully parsed by new Date(date_string)
// 6. If the input date string is invalid, the API returns an object having the structure { error : "Invalid Date" }
// 7. An empty date parameter should return the current time in a JSON object with a unix key
// 8. An empty date parameter should return the current time in a JSON object with a utc key

// Header Parser Requirements

// Tests
// 1. You should provide your own project, not the example URL.
// 2. A request to /api/whoami should return a JSON object with your IP address in the ipaddress key.
// 3. A request to /api/whoami should return a JSON object with your preferred language in the language key.
// 4. A request to /api/whoami should return a JSON object with your software in the software key.

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html

app.use(express.static('public'));

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/whoami", (req, res) => {

  res.json({
    ipaddress: req.ip || req.connection.remoteAddress,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  })
})

app.get("/api/:date?", (req, res) => {

  const { date } = req.params;
  let response = { unix: null, utc: null };
  let currentDate;
  if (!date) {
    currentDate = new Date();
  } else {
    if (!isNaN(date)) {
      currentDate = new Date(parseInt(date));
    } else {
      currentDate = new Date(date);
    }
  }
  if (currentDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }
  response.unix = currentDate.getTime();
  response.utc = currentDate.toUTCString();
  res.json(response);
})


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



