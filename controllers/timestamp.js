// controllers\timestamp.js

// Timestamp requirements 
// 1. You should provide your own project, not the example URL.
// 2. A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
// 3. A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
// 4. A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
// 5. Your project can handle dates that can be successfully parsed by new Date(date_string)
// 6. If the input date string is invalid, the API returns an object having the structure { error : "Invalid Date" }
// 7. An empty date parameter should return the current time in a JSON object with a unix key
// 8. An empty date parameter should return the current time in a JSON object with a utc key


module.exports = {
  getTimestamp: (req, res) => {

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
  }
}