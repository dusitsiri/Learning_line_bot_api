"use strict";

require("dotenv").config();
const express = require("express");
const line = require("@line/bot-sdk");

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

const app = express();
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
  if (event.type === "message" && event.message.type === "text") {
    handleMessageEvent(event);
  } else {
    return Promise.resolve(null);
  }
}

function handleMessageEvent(event) {
  var eventText = event.message.text.toLowerCase();

  if (eventText === "สั่งอาหาร")
    var msg = {
      type: "template",
      altText: "this is a buttons template",
      template: {
        type: "buttons",
        thumbnailImageUrl:
          "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
        title: "Menu",
        text: "Please select",
        actions: [
          {
            type: "postback",
            label: "Buy",
            data: "action=buy&itemid=123"
          },
          {
            type: "postback",
            label: "Add to cart",
            data: "action=add&itemid=123"
          },
          {
            type: "uri",
            label: "View detail",
            uri: "http://example.com/page/123"
          }
        ]
      }
    };
  else if (eventText === "เมนูแนะนำ") {
    msg = {
      type: "image",
      originalContentUrl:
        "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
      previewImageUrl:
        "https://images.performgroup.com/di/library/GOAL/a6/bb/fifa-18-ronaldo_lx3r88bpjpk91re36ukdgomrj.jpg?t=2027563652&w=620&h=430"
    };
  }
  else if (eventText === 'ร้านปรีดาโภชนา') {
    msg = {
        "type": "location",
        "title": "my location",
        "address": "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
        "latitude": 35.65910807942215,
        "longitude": 139.70372892916203
    };
  }
  return client.replyMessage(event.replyToken, msg);
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
