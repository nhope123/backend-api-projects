// controllers\url_shortener.js

const {URL} = require("node:url");
const dns = require("node:dns").promises;

// Requirements
// 1. You should provide your own project, not the example URL.
// 2. You can POST a URL to /api/shorturl and get a JSON response with original_url and short_url properties. Here's an example: { original_url : 'https://freeCodeCamp.org', short_url : 1}
// 3. When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.
// 4. If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain { error: 'invalid url' }
// HINT: Do not forget to use a body parsing middleware to handle the POST requests. Also, you can use the function dns.lookup(host, cb) from the dns core module to verify a submitted URL.
var urlDataStorage = [];
var count = 1;

module.exports = {
  postUrl: async (req, res) => {
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
  },
  getUrl: async (req, res) => {
    let record;
    try {
      const {short_url} = req.params;
      
      if(!short_url || isNaN(parseInt(short_url))) {
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
  }
}