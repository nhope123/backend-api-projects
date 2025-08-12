// index.js
// where your node app starts




// init project
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const dns = require('dns').promises;
const {URL} = require('node:url')

var urlDataStorage = [];
var count = 1;

app.use(bodyParser.urlencoded({ extended: true }));
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { url } = require( 'inspector/promises' );
const { hostname } = require( 'node:os' );
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html

app.use(express.static('public'));

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
// Header Parser Requirements

// Tests
// 1. You should provide your own project, not the example URL.
// 2. A request to /api/whoami should return a JSON object with your IP address in the ipaddress key.
// 3. A request to /api/whoami should return a JSON object with your preferred language in the language key.
// 4. A request to /api/whoami should return a JSON object with your software in the software key.
app.get("/api/whoami", (req, res) => {

  res.json({
    ipaddress: req.ip || req.connection.remoteAddress,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  })
})

// 1. You should provide your own project, not the example URL.
// 2. You can POST a URL to /api/shorturl and get a JSON response with original_url and short_url properties. Here's an example: { original_url : 'https://freeCodeCamp.org', short_url : 1}
// 3. When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.
// 4. If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain { error: 'invalid url' }
// HINT: Do not forget to use a body parsing middleware to handle the POST requests. Also, you can use the function dns.lookup(host, cb) from the dns core module to verify a submitted URL.



app.post("/api/shorturl", async (req, res) => {
  let hostname;
  try {
    hostname = new URL(req.body.url).hostname;  
    if(!hostname) {
      throw new Error("invalid url");    
    }
  
    await dns.lookup(hostname, {all: true});  
  } catch{
    return res.json({ error: 'invalid url' });
  }
  
  let record = urlDataStorage.find((i) => i.original_url === req.body.url);
  if(!record){
    const newRecord = {
      original_url: req.body.url,
      short_url: count += 1,
    }
    urlDataStorage.push(newRecord);
    record = newRecord;
  }

  res.json(record);
});

app.get("/api/shorturl/:short_url", async (req, res) => {
  let record;
  try {
    const {short_url} = req.params;
    
    if(!short_url) {
      throw new Error("invalid url");    
    }

    record = urlDataStorage.find((i) => i.short_url === parseInt(short_url));
     
    if(!record) {
      throw new Error("invalid url");    
    }
   
  } catch (error) {
    return res.json({ error: 'invalid url' });
  }

   return res.redirect(record.original_url);
});

// Timestamp requirements 
// 1. You should provide your own project, not the example URL.
// 2. A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
// 3. A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
// 4. A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
// 5. Your project can handle dates that can be successfully parsed by new Date(date_string)
// 6. If the input date string is invalid, the API returns an object having the structure { error : "Invalid Date" }
// 7. An empty date parameter should return the current time in a JSON object with a unix key
// 8. An empty date parameter should return the current time in a JSON object with a utc key

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



