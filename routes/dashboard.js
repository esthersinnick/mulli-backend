'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isLoggedIn, isSameUser } = require('../helpers/middlewares');

// get my user info
router.get('/', isLoggedIn(), async (req, res, next) => {
  const userId = req.session.currentUser._id;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// update my user info
router.get('/:userId', isLoggedIn(), isSameUser(), async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// edit user info
router.put('/update', isLoggedIn(), async (req, res, next) => {
  const userId = req.session.currentUser._id;
  const userUpdated = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, userUpdated, { new: true });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
