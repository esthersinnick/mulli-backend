// | GET         | /profile                                      | Saved session                |                |              | show a form filled with the user info                        |
// | PUT         | /profile/edit                                 | {userUpdate}                 |                |              | edit user data                                                   |
// | PUT         | /profile/password/edit

'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// get user session info
router.get('/', async (req, res, next) => {
  const UserId = req.session.currentUser._id;
  try {
    const user = await User.findById(UserId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// edit user info
router.put('/edit', async (req, res, next) => {
  const UserId = req.session.currentUser._id;
  try {
    const user = await User.findByIdAndUpdate(UserId, userUpdtated);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
