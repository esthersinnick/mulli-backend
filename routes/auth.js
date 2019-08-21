'use strict';

const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin
} = require('../helpers/middlewares');

router.get('/me', isLoggedIn(), (req, res, next) => {
  res.json(req.session.currentUser);
});

router.put('/me', isLoggedIn(), async (req, res, next) => {
  try {
    const userUpdated = req.body;
    const userId = req.session.currentUser;
    const updated = await User.findByIdAndUpdate(userId, userUpdated, {
      new: true
    });
    // actualizar current User
    updateCurrentUser(req, updated);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

function updateCurrentUser (req, user) {
  req.session.currentUser = user;
  delete req.session.currentUser.password;
}

router.post(
  '/login',
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        next(createError(404, 'User not found'));
      } else if (bcrypt.compareSync(password, user.password)) {
        updateCurrentUser(req, user);
        return res.status(200).json(user);
      } else {
        next(createError(401, "User and password doesn't match"));
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/signup',
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { email, password, name, username } = req.body;
    try {
      const user = await User.findOne(
        { $or: [{ email }, { username }] },
        '_id'
      );
      if (user) {
        return next(createError(422, 'Email or username in use'));
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
          name,
          username,
          email,
          password: hashPass
        });
        req.session.currentUser = newUser;
        res.status(200).json(newUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  return res.status(204).send();
});

module.exports = router;
