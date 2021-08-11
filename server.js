"use strict";
const line = require("node-line-bot-api");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// need raw buffer for signature validation
app.use(
  bodyParser.json({
    verify(req, res, buf) {
      req.rawBody = buf;
    },
  })
);

// init with auth
line.init({
  accessToken:
    "YjCiTcq1Lj6MeprbL8l1Qr6I8r6TP607zjrCH4Gnfl2jTTxE6xf74imYP968csryfBwJOkk9cIQplpyrrt7CBoJU6gIkxIg4w9kZjV1ze1jybg+pHosy5I5UiIE8hGiVPsZtVv9RsIHTT3f8mkwTPwdB04t89/1O/w1cDnyilFU=",
  // (Optional) for webhook signature validation
  channelSecret: "c128d16d64b047d5d5daceafa7de542b",
});

app.post("/webhook/", line.validator.validateSignature(), (req, res, next) => {
  // get content from request body
  const promises = req.body.events.map((event) => {
    // reply message
    return line.client.replyMessage({
      replyToken: event.replyToken,
      messages: [
        {
          type: "text",
          text: event.message.text,
        },
      ],
    });
  });
  Promise.all(promises).then(() => res.json({ success: true }));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Example app listening on port 3000!");
});
