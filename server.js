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

  if (eventText === "โปรโมชั่น") {
  var msg = {
      type: "template",
      altText: "โปรโมชั่น",
      template: {
        type: "confirm",
        text: "Are you sure?",
        actions: [
          {
            type: "message",
            label: "Yes",
            text: "yes"
          },
          {
            type: "message",
            label: "No",
            text: "no"
          }
        ]
      }
    };
  } else if (eventText === "เมนูแนะนำ") {
  var msg = {
      type: "image",
      originalContentUrl:
        "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
      previewImageUrl:
        "https://images.performgroup.com/di/library/GOAL/a6/bb/fifa-18-ronaldo_lx3r88bpjpk91re36ukdgomrj.jpg?t=2027563652&w=620&h=430"
    };
  } else if (eventText === "สั่งอาหาร") {
    var msg = {
      type: "template",
      altText: "สั่งอาหาร",
      template: {
        type: "carousel",
        columns: [
          {
            thumbnailImageUrl:
              "http://postfiles8.naver.net/MjAxODAxMjRfMTg2/MDAxNTE2NzgwMDEyMTYw.5FIcKqzP0B5Cf3o0yd8DXX2lpI0WXQ4uEP6rSnOe0Pgg.oWHdoV_QXXes9SctFAz6Venn-mfxUlaQZapF9gyyhwMg.JPEG.destroyerx/spaghetti-1987454_1920.jpg?type=w2",
            title: "                     Pasta",
            text: "        Choose the menu below",
            actions: [
              {
                type: "message",
                label: "Tomato Pasta",
                text: "Tomato Pasta"
              },
              {
                type: "message",
                label: "Olive Pasta",
                text: "Olive Pasta"
              }
            ]
          },
          {
            thumbnailImageUrl:
              "https://postfiles.pstatic.net/MjAxODAxMTJfMjgy/MDAxNTE1NzM5ODgyMzU2.uno8L7N4v3xk-16ormEE1RMZ2PEgS0olVXUYcMOhCY8g.elB-yyuOlN6-NnbejDQ9ru-kkf88YaxJUFst-3ssLisg.JPEG.destroyerx/pizza-2766487_1920.jpg?type=w2",
            title: "                     Pizza",
            text: "        Choose the menu below",
            actions: [
              {
                type: "message",
                label: "Super Supreme Pizza",
                text: "Super Supreme Pizza"
              },
              {
                type: "message",
                label: "Peperoni",
                text: "Peperoni"
              }
            ]
          },
        //   {
        //     thumbnailImageUrl:
        //       "https://postfiles.pstatic.net/MjAxODAxMTJfMzEg/MDAxNTE1NzMxODE3Mjgw.rROrcD8PQYk_febepsveurYQveHdhx6ljWTyYWLyQmQg.WFflEpeSmkYHqbkwieaj2Kda2D8zuWjqbQrrO7jJwKQg.JPEG.destroyerx/sally's_brunch.jpg?type=w2",
        //     title: "                     Steak",
        //     text: "       Choose the menu below",
        //     actions: [
        //       {
        //         type: "message",
        //         label: "T-Bone Steak",
        //         text: "T-Bone Steak"
        //       },
        //       {
        //         type: "message",
        //         label: "Ribeye Steak",
        //         text: "Ribeye Steak"
        //       }
        //     ]
        //   }
        ]
      }
    };
  } else if (eventText === "จองห้องคาราโอเกะ") {
  var msg = {
      type: "template",
      altText: "จองห้องคาราโอเกะ",
      template: {
        type: "carousel",
        columns: [
          {
            thumbnailImageUrl:
              "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
            title: "this is menu",
            text: "description",
            actions: [
              {
                type: "postback",
                label: "Buy",
                data: "action=buy&itemid=111"
              },
              {
                type: "postback",
                label: "Add to cart",
                data: "action=add&itemid=111"
              },
              {
                type: "uri",
                label: "View detail",
                uri: "http://example.com/page/111"
              }
            ]
          },
          {
            thumbnailImageUrl:
              "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
            title: "this is menu",
            text: "description",
            actions: [
              {
                type: "postback",
                label: "Buy",
                data: "action=buy&itemid=222"
              },
              {
                type: "postback",
                label: "Add to cart",
                data: "action=add&itemid=222"
              },
              {
                type: "uri",
                label: "View detail",
                uri: "http://example.com/page/222"
              }
            ]
          }
        ]
      }
    };
  } else if (eventText === "ประวัติการสั่งซื้อ") {
   var msg = {
      type: "text",
      text:
        "Here is your reservation details.\n\n1. Date : 170201\n2. Name : LINE\n3. Time : PM:7:00\n4. The Number of People : 3\n5. Specific requirement : baby seat\n6. Menu : Tomato Pasta, T-bone Steak\n\n\nYour Reservation has been done. \nWe will do our best to serve you. Thank you."
    };
  } else if (eventText === "ร้านปรีดาโภชนา") {
   var msg = {
      type: "location",
      title: "ร้านปรีดาโภชนา",
      address:
        "ถนน สุขุมวิท ตำบล บางพระ อำเภอเมืองตราด ตราด 23000 ประเทศไทย ตราด",
      latitude: 12.2498062,
      longitude: 102.5103845
    };
  }
  return client.replyMessage(event.replyToken, msg);
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
