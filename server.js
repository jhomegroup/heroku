const express = require("express");
const line = require("@line/bot-sdk");
const PORT = process.env.PORT || 3000;
const axios = require("axios");

const config = {
  channelAccessToken:
    "YjCiTcq1Lj6MeprbL8l1Qr6I8r6TP607zjrCH4Gnfl2jTTxE6xf74imYP968csryfBwJOkk9cIQplpyrrt7CBoJU6gIkxIg4w9kZjV1ze1jybg+pHosy5I5UiIE8hGiVPsZtVv9RsIHTT3f8mkwTPwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "c128d16d64b047d5d5daceafa7de542b",
};

const app = express();
app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  axios
    .get(
      `http://vhome.wanorn.com/lab_result/frontend/api/lab_results/${event.message.text}`
    )
    .then((response) => {
      response.data.data.forEach((element) => {
        return client.replyMessage(event.replyToken, {
          type: "text",
          text: ` ข้อมูลผลตรวจโควิด รพ.วานร \n ชื่อ : ${element.ptname}\n ตรวจ : ${element.lab_items_name_ref}\n วันที่ : ${element.report_date}\n ผลตรวจ : ${element.lab_order_result}\n`,
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

app.listen(PORT, () => {
  console.log(`Serer is running. ${PORT}`);
});
