// node options
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));



// Body code
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

// Main page
app.get("/", function(req, res) {
 let day = date.getDate();

  res.render("list", {
    listTitle: day,
    newToDo: items
  });
});

app.post("/", function(req, res) {
  let item = req.body.newItem

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  }else {
  items.push(item);
  res.redirect("/");
}});

// Work page
app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newToDo: workItems
  });
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

// About page

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("server started on port 3000.");
});
