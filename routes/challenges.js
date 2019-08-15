'use strict';

const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

// get all challenges
router.get('/', async (req, res, next) => {
  try {
    const listOfChallenges = await Challenge.find();
    res.status(200).json({ listOfChallenges });
  } catch (error) {
    next(error);
  }
});

// get one challenge
router.get('/:challengeId', async (req, res, next) => {
  const { challengeId } = req.params;
  try {
    const challenge = await Challenge.findById(challengeId);
    res.status(200).json(challenge);
  } catch (error) {
    next(error);
  }
});

// Create new challenge
router.post('/add', async (req, res, next) => {
  try {
    const newChallenge = req.body;
    const createdChallenge = await Challenge.create(newChallenge);
    res.status(200).json(createdChallenge);
  } catch (error) {
    next(error);
  }
});

// edit a challenge
router.put('/:challengeId/edit', async (req, res, next) => {
  const { challengeId } = req.params;
  const challengeUpdated = req.body;
  try {
    const updated = await Challenge.findByIdAndUpdate(challengeId, challengeUpdated, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

// delete a challenge
router.delete('/:challengeId/delete', async (req, res, next) => {
  const { challengeId } = req.params;
  try {
    await Challenge.findByIdAndDelete(challengeId);
    res.status(200).json({ message: 'challenge deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
