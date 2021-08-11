var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "192.168.108.2",
  user: "root",
  password: "wanorn",
  database: "ehosxp",
});

connection.connect();

connection.query(
  "SELECT * FROM opduser LIMIT 10",
  function (error, results, fields) {
    if (error) throw error;
    console.log("The solution is: ", results[0].solution);
  }
);

connection.end();

// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 8080;

// app.get("/", (req, res) => {
//   res.json({ result: "ok", data: [1, 2, 3, 4, 5] });
// });

// app.listen(PORT, () => {
//   console.log(`Serer is running. ${PORT}`);
// });
