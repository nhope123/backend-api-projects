

/**
* Requirements
* 1. You should provide your own project, not the example URL.
* 2. You can POST to /api/users with form data username to create a new user.
* 3. The returned response from POST /api/users with form data username will be an object with username and _id properties.
* 4. You can make a GET request to /api/users to get a list of all users.
* 5. The GET request to /api/users returns an array.
* 6. Each element in the array returned from GET /api/users is an object literal containing a user's username and _id.
* 7. You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.
* 8. The response returned from POST /api/users/:_id/exercises will be the user object with the exercise fields added.
* 9. You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
* 10. A request to a user's log GET /api/users/:_id/logs returns a user object with a count property representing the number of exercises that belong to that user.
* 11. A GET request to /api/users/:_id/logs will return the user object with a log array of all the exercises added.
* 12. Each item in the log array that is returned from GET /api/users/:_id/logs is an object that should have a description, duration, and date properties.
* 13. The description property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string.
* 14. The duration property of any object in the log array that is returned from GET /api/users/:_id/logs should be a number.
* 15. The date property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string. Use the dateString format of the Date API.
* 16. You can add from, to and limit parameters to a GET /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.
*/

/**
*  Your responses should have the following structures.
*
*  Exercise:
*
*  {
*    username: "fcc_test",
*    description: "test",
*    duration: 60,
*    date: "Mon Jan 01 1990",
*    _id: "5fb5853f734231456ccb3b05"
*  }
*  User:
*
*  {
*    username: "fcc_test",
*    _id: "5fb5853f734231456ccb3b05"
*  }
*  Log:
*
*  {
*    username: "fcc_test",
*    count: 1,
*    _id: "5fb5853f734231456ccb3b05",
*    log: [{
*      description: "test",
*      duration: 60,
*      date: "Mon Jan 01 1990",
*    }]
*  }
*  Hint: For the date property, the toDateString method of the Date API can be used to achieve the expected output.
*/


// Generates a random 24-character hex string (MongoDB ObjectId style)
function generateObjectId() {
  return Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

const exercise_tracker_db = [
  {
    "username": "nial",
    "_id": "c96aa2be16335d44dc645eaf"
}
];

module.exports = {
  // Post '/api/users'
  // Note: If using multipart/form-data, ensure you have multer or similar middleware in your main app to parse req.body
  createUser: async (req, res) => {
    let username = req.body && req.body.username;
    if (!username) {
      return res.status(400).json({ error: "Username is required!" });
    }
    // Check for existing user
    const user = exercise_tracker_db.find((i) => i.username === username);
    if (user) {
      // Return the existing user (per FCC spec, do not error)
      return res.json({ username: user.username, _id: user._id });
    }
    const record = {
      username,
      _id: generateObjectId()
    };
    exercise_tracker_db.push({
      ...record,
      count: 0,
      log: [],
    });
    return res.json(record);
  },
  // /api/users to get a list of all users
  getAllUsers: async (_req, res) => {
  // returns an array of users (username and _id only)
  const users = exercise_tracker_db.map(({ username, _id }) => ({ username, _id }));
  res.json(users);
  },
  //POST to /api/users/:_id/exercises with form data description, duration, and optionally date.
  updateUser: async (req, res) => {
    const {body: { description, duration, date}, params: {_id}} = req;
    let exerciseDate;
    let _duration = duration;
    let record_ind;

    // Validate input
    if (!description || !_duration || !_id) {
      return res.status(400).json({ error: "Description, duration, and id is required!" });
    }
    if (typeof description !== 'string') {
      description = String(description);
    }
    if (typeof _duration !== 'number') {
      _duration = parseInt(_duration);
      if (isNaN(_duration)) {
        return res.status(400).json({ error: "Duration should be a number!" });
      }
    }

    record_ind = exercise_tracker_db.findIndex((i) => i._id === _id);
    if (record_ind === -1) {
      return res.status(400).json({ error: "User not found!" });
    }

    if (!date) {
      exerciseDate = new Date().toDateString();
    } else {
      const d = new Date(date);
      exerciseDate = isNaN(d) ? new Date().toDateString() : d.toDateString();
    }

    const user = exercise_tracker_db[record_ind];
    const newCount = (user?.count ?? 0) + 1;

    exercise_tracker_db[record_ind] = {
      ...user,
      count: newCount,
      log: [
        ...(user?.log ?? []),
        {
          description,
          duration: _duration,
          date: exerciseDate,
        }
      ]
    };

    const newRecord = {
      username: user.username,
      description,
      duration: _duration,
      _id,
      date: exerciseDate,
    };

    return res.json(newRecord);
  },
  // You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
  getUserLogs: async (req, res) => {
    if (!req.params._id) {
      return res.status(400).json({ error: "User Id Required!" });
    }
    const user = exercise_tracker_db.find((i) => i['_id'] === req.params._id);
    if (!user) {
      return res.status(400).json({ error: "Record does not exist!" });
    }

    // Parse query params
    let { from, to, limit } = req.query;
    let log = user.log || [];

    // Filter by date range if provided
    if (from) {
      const fromDate = new Date(from);
      if (!isNaN(fromDate)) {
        log = log.filter(entry => new Date(entry.date) >= fromDate);
      }
    }
    if (to) {
      const toDate = new Date(to);
      if (!isNaN(toDate)) {
        log = log.filter(entry => new Date(entry.date) <= toDate);
      }
    }

    // Limit number of results if provided
    if (limit) {
      const lim = parseInt(limit);
      if (!isNaN(lim) && lim > 0) {
        log = log.slice(0, lim);
      }
    }

    // Ensure log items have correct types
    log = log.map(entry => ({
      description: String(entry.description),
      duration: Number(entry.duration),
      date: String(entry.date)
    }));

    res.json({
      username: user.username,
      _id: user._id,
      count: log.length,
      log
    });
  }
}

