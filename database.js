const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const axios = require("axios");

app.get("/", (req, res) => {
  //   axios
  //     .get(
  //       `https://vhome.wanorn.com/lab_result/frontend/api/lab_results/1470801515704`
  //     )
  //     .then((resp) => {
  //       console.log(resp);
  //       res.json({ result: "ok", data: "asd" });
  //     });
  //   const axios = require("axios");
  axios
    .get(
      "http://vhome.wanorn.com/lab_result/frontend/api/lab_results/1470801515704"
    )
    .then((response) => {
      console.log(response.data.data);
      response.data.data.forEach((element) => {
        console.log(element.ptname);
      });
      res.json({ data: response.data.data });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log(`Serer is running. ${PORT}`);
});
