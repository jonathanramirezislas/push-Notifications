const express = require('express');
const webpush = require('web-push');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,"client")));

app.use(express.json());

//put en env later XD 
const publicVapidKey = 'BIa9BJCII7IvRvqsPXGrLStWLCsUlNZ_RE9sKj8k3grfLUYpsNkMRUOKWzJKQjy5s9tTJhML1zGjmYf8FcJ0_W8';
const privateVapidKey = 'ysJVT6aw6eNFZgmS5hRB-J1FB2wpjsbixlL3aFHT0ak';

webpush.setVapidDetails(
    "mailto:jona@tjona.com",
    publicVapidKey,
    privateVapidKey
  );
  
  // Subscribe Route
  app.post("/subscribe", (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;
  
    // Send 201 - resource created
    res.status(201).json({});
  
    // Create payload
    const payload = JSON.stringify({ title: "Push Test" });
  
    // Pass object into sendNotification
    webpush
      .sendNotification(subscription, payload)
      .catch(err => console.error(err));
  });
  
  const port = 5000;
  
  app.listen(port, () => console.log(`Server started on port ${port}`));