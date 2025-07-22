const express = require('express');
const { auth } = require('../middleware/auth');

const profileRouter = express.Router();

profileRouter.get("/getProfile", auth, async (req, res) => {
    try {
      const user = req.user;
  
      res.send(user);
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  });




  module.exports=profileRouter;