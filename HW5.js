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
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('GET_request', context);
});

//MUST CITE!
app.post("/", function (req, res) {
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('POST_request', context);
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
