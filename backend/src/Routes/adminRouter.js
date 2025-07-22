const express = require('express');
const router = express.Router();
const {
  getAllUser
} = require('../Controller/adminController');


// Rest of the routes remain the same
router.get('/getUsers',  getAllUser);

module.exports = router;