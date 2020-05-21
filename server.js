const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

//serve static files
app.use(express.static(path.join(__dirname, "public")));

// middleware to parse request body data
app.use(express.urlencoded({extended: false})); // can't send nested object
app.use(express.json());

//setup express handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// use router
const burgerRouter = require("./controllers/burgers_controller");
app.use(burgerRouter);

app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
});