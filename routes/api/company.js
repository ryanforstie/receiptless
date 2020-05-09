// Company route

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Company = require('../../models/Company');
const User = require('../../models/User');

// @router   GET api/company/me
// @desc     Get the current users company
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    // Get the name and avatar of the current user
    const company = await await Company.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    // If there is no company
    if (!company) {
      return res.status(400).json({ msg: 'No company exist for this user' });
    }
    // If there is a company
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @router   POST api/company
// @desc     Create or update the user's company data
// @access   Private
router.post(
  '/',
  [auth, [check('company', 'Company name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { company, website, location, bio } = req.body;

    // Build company object
    const companyFields = {};
    companyFields.user = req.user.id;
    if (company) companyFields.company = company;
    if (website) companyFields.website = website;
    if (location) companyFields.location = location;
    if (bio) companyFields.bio = bio;

    // Update and add company object data
    try {
      let company = await Company.findOne({ user: req.user.id });

      // Update if company found
      if (company) {
        company = await Company.findOneAndUpdate(
          { user: req.user.id },
          { $set: companyFields },
          { new: true }
        );

        return res.json(company);
      }

      // Create company if not found
      company = new Company(companyFields);

      await company.save();
      res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @router   GET api/company
// @desc     Get all companies
// @access   Public
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find().populate('user', ['name', 'avatar']);
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @router   GET api/company/user/:user_id
// @desc     Get company by user id
// @access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const company = await Company.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    // Check if there is a company for the user
    if (!company) return res.status(400).json({ msg: 'Company is not found' });
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @router   DELETE api/company
// @desc     Delete profile, and user
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove company
    await Company.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User was deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @router   POST api/company/receipts
// @desc     Add a new company receipt
// @access   Private
router.post(
  '/receipts',
  [
    auth,
    [
      check('date', 'Date is required').not().isEmpty(),
      check('merchant', 'Merchant is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('amount', 'Amount is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // If there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If there are no errors
    const { date, merchant, description, amount } = req.body;

    // Set values
    const newReceipt = {
      date,
      merchant,
      description,
      amount,
    };

    // Add to database
    try {
      const company = await Company.findOne({ user: req.user.id });
      // Push new receipt to front of list
      company.receipts.unshift(newReceipt);
      // Save to database
      await company.save();
      res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @router   PUT api/company/receipts/receipt_id
// @desc     Update a company receipt
// @access   Private
router.put(
  '/receipts/:receipt_id',
  [
    auth,
    [
      check('date', 'Date is required').not().isEmpty(),
      check('merchant', 'Merchant is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('amount', 'Amount is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // If there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If there are no errors
    const { date, merchant, description, amount } = req.body;

    // Set values
    const upatedReceipt = {
      date,
      merchant,
      description,
      amount,
    };

    // Add to database
    try {
      const company = await Company.findOne({ user: req.user.id });

      // Update receipt with new data
      const updateIndex = company.receipts
        .map((item) => item.id)
        .indexOf(req.params.receipt_id);
      company.receipts.splice(updateIndex, 1, upatedReceipt);

      // Save to database
      await company.save();
      res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @router   DELETE api/company/receipts/:receipt_id
// @desc     Delete a company receipt
// @access   Private
router.delete('/receipts/:receipt_id', auth, async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user.id });

    // Get the remove index
    const removeIndex = company.receipts
      .map((item) => item.id)
      .indexOf(req.params.receipt_id);
    company.receipts.splice(removeIndex, 1);

    await company.save();
    res.json(company);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
