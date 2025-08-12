// index.js
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const url_shortener = require( './controllers/url_shortener' );
const timestamp = require('./controllers/timestamp');
const whoami = require( './controllers/whoami');
const exercise_tracker = require('./controllers/exercise_tracker');
var cors = require('cors');
const metadata = require( './controllers/metadata');
const multer  = require('multer');
const upload = multer();
// Basic Configuration
const port = process.env.PORT || 3000;



// Middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
// Do not use app.use(multer()) globally; use 'upload' as middleware only for file upload routes.

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use('/public', express.static(`${process.cwd()}/public`));

// API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Header Parser Project
app.get("/api/whoami", whoami.get);

// Url Shortener Project
app.post("/api/shorturl", url_shortener.postUrl);
app.get("/api/shorturl/:short_url", url_shortener.getUrl);

// Exercise Tracker Project
// Create new User
app.post('/api/users', exercise_tracker.createUser); 
// Get All Users
app.get('/api/users', exercise_tracker.getAllUsers);

// Update User data
app.post("/api/users/:_id/exercises", exercise_tracker.updateUser)
// Retrieve User logs
app.get("/api/users/:_id/logs", exercise_tracker.getUserLogs);


app.post('/api/fileanalyse', upload.single('upfile'), metadata.uploadFile)

// Timestamp project
app.get("/api/:date?", timestamp.getTimestamp)

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Listen on port set in environment variable or default to 3000
app.listen(port, function () {
  console.log(`Your app is listening on port ${port}`);
});



