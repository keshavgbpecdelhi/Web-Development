//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Rooted in a culture of learning and sharing, we believe that knowledge should be accessible for all. We are committed to improving the tech industry and are passionate about sharing our expertise across technology, business, and culture. From deep technical topics to current business trends, our articles, blogs, podcasts and event material has you covered.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];


app.get("/", function (req, res) {
  res.render("home", { StartingContent: homeStartingContent, posts: posts });
})

app.get("/about", function (req, res) {
  res.render("About", { acontent: aboutContent });
})

app.get("/contact", function (req, res) {
  res.render("Contact", { ccontent: contactContent });
})

app.get("/compose", function (req, res) {
  res.render("Compose");

})

app.post("/compose", function (req, res) {

  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/")

})

//dynamic website
app.get("/posts/:postName", function (req, res) {
  var requestedTitle = _.lowerCase(req.params.postName);


  //checking for posttile entered by user exists in oue data or not
  posts.forEach(function (post) {

    var storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {

      res.render("post", {
        title: post.title,
        content: post.content

      });
    }

  })
})


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
