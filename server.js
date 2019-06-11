'use strict';
require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');
const app = express();

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};
const port = process.env.PORT || 4000;
const client = new line.Client(config);

app.post(`/webhook`, line.middleware(config), (req, res) => {
    Promise.all(req.body.events.map(handleEvent))
      .then(result => res.json(result))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  });

function handleEvent(event) {
    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'สวัสดีครับ'
    };
    return client.replyMessage(event.replyToken, msg);
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });