const express = require("express");
const burger = require("../models/burger");

const router = express.Router();
// get all burgers
router.get("/", (req, res) => {
  burger.selectAll((results) => {
    if (results === "error") {
      return res.status(500).end();
    }
    const devouredBurgers = []
    const nonDevouredBurgers = [];
    results.forEach(elem => {
      if (elem.devoured) {
        devouredBurgers.push(elem);
      } else {
        nonDevouredBurgers.push(elem);
      }
    });

    if (nonDevouredBurgers.length <= 0) {
      res.render("index", {devoured: devouredBurgers, notEaten: nonDevouredBurgers, msg: "Please add a burger"});
      return;
    }
    res.render("index", {devoured: devouredBurgers, notEaten: nonDevouredBurgers});
  });
});

// read route
router.get("/api", (req,res) => {
  burger.selectAll((results) => {
    if (results === "error") {
      return res.status(500).end();
    }
    res.json(results);
  })
})

// update
router.put("/api/devour/:id", (req, res) => {
  burger.update({devoured: req.body.devoured}, 
    {id: parseInt(req.params.id)}, (results) => {
    if (results === "error") {
      return res.status(500).end();
    }
    res.json(results);
  });
});

//create endpoint
router.post("/api/create", (req, res) => {
  burger.insert({
    burger_name: req.body.burger_name, 
  }, (results) => {
    if (results === "error") {
      return res.status(500).end();
    }
    res.json(results);
  });
});

// delete endpoint
router.delete("/api/devour/:id", (req,res) => {
  burger.delete({id: req.params.id}, (results) => {
    if (results === "error") {
      res.status(500).end();
    }
    return res.json(results);
  })
});

module.exports = router;