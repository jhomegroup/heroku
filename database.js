const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const axios = require("axios");

// app.get("/", async (req, res) => {
//   try {
//     const response = await axios({
//       url: "https://vhome.wanorn.com/lab_result/frontend/api/lab_results/1470801515704",
//       method: "get",
//     });
//     res.status(200).json({'asd': response});
//   } catch (err) {
//     res.status(500).json({ message: err });
//   }
// });

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
      res.json({ result: "ok", data: response.data.data });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(PORT, () => {
  console.log(`Serer is running. ${PORT}`);
});
