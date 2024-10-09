// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Route to serve index.html from 'views' folder
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp API
app.get("/api/:date?", (req, res) => {
  let date;

  // Handle if no date is provided (current date)
  if (!req.params.date) {
    date = new Date();
  } else {
    const dateString = req.params.date;

    // Check if the date is a Unix timestamp (i.e., contains only digits)
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // Check if date is valid
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
