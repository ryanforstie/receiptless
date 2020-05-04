// Users route

const express = require('express');
const router = express.Router();

// @router   GET api/users
// @desc     Test route
// @access   Public
router.get('/', (req, res) => res.send('Users route'));

module.exports = router;
