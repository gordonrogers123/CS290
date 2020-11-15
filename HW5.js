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


//MUST CITE!
app.get("/", function (req, res) {
  var getResponse = "<h1>GET Request Received</h1><br><br>";
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render(getResponse + 'get-loopback-improved', context);
});

//MUST CITE!
app.post("/", function (req, res) {
  var postResponse = "<h1>POST Request Received</h1><br><br>";
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.send(postResponse + 'POST_response', context);
});


//404-error
app.use(function (req, res) {
  res.status(404);
  res.render("404");
});

//500-error
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type("plain/text");
  res.status(500);
  res.render("500");
});

//listener for selected port
app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://flip3.engr.oregonstate.edu/:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
