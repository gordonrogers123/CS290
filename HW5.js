var express = require("express");

var app = express();
var handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 8591);

var paramValPair = function (object) {
  var keys = [];
  for (var q in object) {
    keys += "<td>" + q + "</td>" + "<td>" + object[q] + "</td>";
  }
  return "<tr>" + keys + "</tr>";
};

app.get("/", function (req, res) {
  var getResponse = "<h1>GET Request Received</h1><br><br>";
  var table = "<table><tr><td>url: " + req.url + "</td>";
  table += "<td>body: " + paramValPair(req.body) + "</td>";
  table += "</tr></table>";
  res.send(getResponse + table);
});

app.post("/", function (req, res) {
  var postResponse = "<h1>POST Request Received</h1><br><br>";
  var table = "<table><tr>";
  table += "<td>names: " + req.url + "</td>";
  table += "<td>values: " + paramValPair(req.body) + "</td>";
  table += "</tr></table>";
  res.send(postResponse + table);
});

app.use(function (req, res) {
  res.status(404);
  res.render("404");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type("plain/text");
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://flip3.engr.oregonstate.edu/:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
