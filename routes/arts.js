'use strict';

const express = require('express');
const router = express.Router();
const Art = require('../models/Art');
const {
  isLoggedIn,
  isAdmin
} = require('../helpers/middlewares');

// get all arts
router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const listOfArts = await Art.find();
    res.status(200).json({ listOfArts });
  } catch (error) {
    next(error);
  }
});

// get all arts of a user

router.get('/:userId', isLoggedIn(), async (req, res, next) => {
  try {
    const { userId } = req.params;
    const listOfArts = await Art.find({ user: userId });
    res.status(200).json({ listOfArts });
  } catch (error) {
    next(error);
  }
});

// get all arts of a challenge

router.get('/challenge/:challengeId', isLoggedIn(), async (req, res, next) => {
  try {
    const { challengeId } = req.params;
    const listOfArts = await Art.find({ challenge: challengeId });
    res.status(200).json({ listOfArts });
  } catch (error) {
    next(error);
  }
});

// get one art of a user and challenge

router.get('/challenge/:challengeId/user', isLoggedIn(), async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const { challengeId } = req.params;
    const listOfArts = await Art.find({ $and: [{ challenge: challengeId }, { user: userId }] });
    res.status(200).json({ listOfArts });
  } catch (error) {
    next(error);
  }
});

// add a new art
router.post('/add', isLoggedIn(), async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const newArt = req.body;
    newArt.user = userId;
    const CreatedArt = await Art.create(newArt);
    res.status(200).json(CreatedArt);
  } catch (error) {
    next(error);
  }
});

// edit an art
router.put('/:artId/update', isLoggedIn(), async (req, res, next) => {
  const { artId } = req.params;
  const artUpdtated = req.body;
  try {
    const updated = await Art.findByIdAndUpdate(artId, artUpdtated, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
