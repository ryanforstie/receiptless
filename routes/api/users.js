// Users route: validating a new user

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// User model
const User = require('../../models/User');

// @router   POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',

  // Name, email, password validation
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 5 or more characters'
    ).isLength({ min: 5 }),
  ],
  // Response
  async (req, res) => {
    // Return errors if validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get user's gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      // Create new user
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user to the database
      await user.save();

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
        { expiresIn: 3600000 },
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
