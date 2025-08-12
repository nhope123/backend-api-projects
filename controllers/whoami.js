// controllers\whoami.js

// Requirements
// 1. You should provide your own project, not the example URL.
// 2. A request to /api/whoami should return a JSON object with your IP address in the ipaddress key.
// 3. A request to /api/whoami should return a JSON object with your preferred language in the language key.
// 4. A request to /api/whoami should return a JSON object with your software in the software key.

module.exports = {
  get: (req, res) => {
    res.json({
      ipaddress: req.ip || req.connection.remoteAddress,
      language: req.headers['accept-language'],
      software: req.headers['user-agent']
    })
  }
}