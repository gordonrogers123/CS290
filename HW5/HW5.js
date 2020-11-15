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


//Taken from Server-Side Form Handling lecture
//Route handler for GET requests
app.get("/", function (req, res) {
  // empty list to hold pairs of query name:params
  var qParams = [];
  //loops for each query
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  //makes an array of {name, value} pairs from qParams
  var context = {};
  context.dataList = qParams;
  // renders _request.handlebars with given context for 'name' and 'value'
  res.render('GET_request', context);
});

//Taken from Server-Side Form Handling lecture
//Route handler for POST requests
app.post("/", function (req, res) {
  // empty list to hold pairs of query name:params
  var qParams = [];
  //loops for each query, pushing name:value pair onto qParams
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  //makes an array of {name, value} pairs from qParams
  var context = {};
  context.dataList = qParams;
  // renders POST_request.handlebars with given context for 'name' and 'value'
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
