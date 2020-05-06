// Auth route

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @router   GET api/auth
// @desc     Protected route for users
// @access   Protected
router.get('/', auth, async (req, res) => {
  try {
    const user = await await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @router   POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',

  // Check if email exist, and password required
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  // Response
  async (req, res) => {
    // Return errors if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Return jsonwebtoken
      // Get the payload with user id
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Check if token is valid
      jwt.sign(
        payload,
        config.get('jwtToken'),
        { expiresIn: 3600000 }, //------------------------------------Change for production to one hours--------------------------
        (err, token) => {
          if (err) throw err;
          // Return token to client if no errors
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
