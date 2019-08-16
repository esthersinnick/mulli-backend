'use strict';

const createError = require('http-errors');

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    next(createError(401));
  }
};

exports.isSameUser = () => (req, res, next) => {
  if (req.session.currentUser._id.toString() === req.params.userId) {
    next();
  } else {
    next(createError(401));
  }
};

exports.isAdmin = () => (req, res, next) => {
  if (req.session.currentUser && req.session.currentUser.isAdmin) {
    next();
  } else {
    next(createError(401));
  }
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) {
    next();
  } else {
    next(createError(403));
  }
};

exports.validationLoggin = () => (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(createError(422));
  } else {
    next();
  }
};
