
# FreeCodeCamp APIs & Microservices Project Suite

This repository contains implementations for several FreeCodeCamp Back End Development and APIs certification projects. Each microservice is built with Node.js and Express, and is designed to be deployed independently or as a suite. See below for detailed instructions, API documentation, and test requirements for each project.



## Table of Contents

- [Timestamp Microservice](#timestamp-microservice)
- [Request Header Parser Microservice](#request-header-parser-microservice)
- [URL Shortener Microservice](#url-shortener-microservice)
- [Exercise Tracker](#exercise-tracker)
- [File Metadata Microservice](#file-metadata-microservice)
- [Live Demo](#live-demo)
- [License](#license)



## Timestamp Microservice

Build a full stack JavaScript app that is functionally similar to [this example](https://timestamp-microservice.freecodecamp.rocks).


**API Endpoints:**
- `GET /api/:date?` — Returns a JSON object with `unix` (timestamp in ms) and `utc` (date string) for a valid date, or `{ error: "Invalid Date" }` for invalid input. If no date is provided, returns the current time.

**Example:**
```json
{
	"unix": 1451001600000,
	"utc": "Fri, 25 Dec 2015 00:00:00 GMT"
}
```

**Tests:**
1. Provide your own project, not the example URL.
2. Valid date returns correct `unix` and `utc`.
3. Invalid date returns `{ error: "Invalid Date" }`.
4. Empty date returns current time.



## Request Header Parser Microservice

Build a full stack JavaScript app that is functionally similar to [this example](https://request-header-parser-microservice.freecodecamp.rocks/).

**API Endpoint:**
- `GET /api/whoami` — Returns a JSON object with your IP address, preferred language, and software.

**Example:**
```json
{
	"ipaddress": "::ffff:127.0.0.1",
	"language": "en-US,en;q=0.9",
	"software": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}
```

**Tests:**
1. Provide your own project, not the example URL.
2. `/api/whoami` returns correct `ipaddress`, `language`, and `software` keys.



## URL Shortener Microservice

Build a full stack JavaScript app that is functionally similar to [this example](https://url-shortener-microservice.freecodecamp.rocks).

**API Endpoints:**
- `POST /api/shorturl` — Accepts a URL, returns `{ original_url, short_url }`.
- `GET /api/shorturl/:short_url` — Redirects to the original URL.

**Hints:**
- Use a body parsing middleware for POST requests.
- Use `dns.lookup(host, cb)` to verify submitted URLs.

**Example:**
```json
{
	"original_url": "https://freeCodeCamp.org",
	"short_url": 1
}
```

**Tests:**
1. Provide your own project, not the example URL.
2. POST returns correct JSON.
3. GET redirects to original URL.
4. Invalid URL returns `{ error: 'invalid url' }`.



## Exercise Tracker

Build a full stack JavaScript app that is functionally similar to [this example](https://exercise-tracker.freecodecamp.rocks).

**API Endpoints:**
- `POST /api/users` — Create a new user.
- `GET /api/users` — Get all users.
- `POST /api/users/:_id/exercises` — Add exercise to user.
- `GET /api/users/:_id/logs` — Retrieve user's exercise log (supports `from`, `to`, `limit` query params).

**Example User:**
```json
{
	"username": "fcc_test",
	"_id": "5fb5853f734231456ccb3b05"
}
```
**Example Exercise:**
```json
{
	"username": "fcc_test",
	"description": "test",
	"duration": 60,
	"date": "Mon Jan 01 1990",
	"_id": "5fb5853f734231456ccb3b05"
}
```
**Example Log:**
```json
{
	"username": "fcc_test",
	"count": 1,
	"_id": "5fb5853f734231456ccb3b05",
	"log": [
		{
			"description": "test",
			"duration": 60,
			"date": "Mon Jan 01 1990"
		}
	]
}
```

**Tests:**
1. Provide your own project, not the example URL.
2. POST/GET endpoints work as specified.
3. Log supports `from`, `to`, `limit` params.
4. Dates use `toDateString` format.



## File Metadata Microservice

Build a full stack JavaScript app that is functionally similar to [this example](https://file-metadata-microservice.freecodecamp.rocks).

**API Endpoint:**
- `POST /api/fileanalyse` — Accepts file upload (field name: `upfile`), returns file name, type, and size in bytes.

**Hint:** Use the `multer` npm package for file uploads.

**Example:**
```json
{
	"name": "file.txt",
	"type": "text/plain",
	"size": 1024
}
```

**Tests:**
1. Provide your own project, not the example URL.
2. Form includes file upload with field `upfile`.
3. Response includes file name, type, and size.





## Live Demo

You can view the live version of this project here [@Nial`s Backend Api Solutions](https://ceedf041-bf8a-4679-99a3-50837c958791-00-22lsnox4xgdm5.picard.replit.dev/)



## License

This project is licensed under the [MIT License](LICENSE).