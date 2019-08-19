'use strict';

const express = require('express');
const router = express.Router();
const Art = require('../models/Art');
const Challenge = require('../models/Challenge');
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
    const listOfArts = await Art.find({ challenge: challengeId }).populate('user');
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
    // cambiar por params cuando tienes tiempo :)
    const { challengeId } = req.body;
    const challenge = await Challenge.findById(challengeId);
    const listOfArts = await Art.find({ $and: [{ challenge: challengeId }, { user: userId }] });
    if (challenge.status === 'active' && listOfArts.length === 0) {
      const { newArt } = req.body;
      newArt.user = userId;
      newArt.challenge = challengeId;
      const CreatedArt = await Art.create(newArt);
      listOfArts.push(newArt);
      res.status(200).json(CreatedArt);
    } else {
      res.status(200).json(listOfArts[0]);
    }
  } catch (error) {
    next(error);
  }
});

// edit an art
router.put('/:artId/update', isLoggedIn(), async (req, res, next) => {
  try {
    const { artId } = req.params;
    const artUpdtated = req.body;
    const updated = await Art.findByIdAndUpdate(artId, artUpdtated, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

// add vote
router.put('/:artId/addVote', isLoggedIn(), async (req, res, next) => {
  try {
    const { artId } = req.params;
    const userId = req.session.currentUser._id;
    const art = await Art.findById(artId);
    const newVotes = [...art.votes];
    console.log(newVotes, userId);
    // const newVotesString = newVotes.map(id => {
    //   return JSON.stringify(id);
    // });
    // console.log(newVotesString);

    if (newVotes.includes(userId)) {
      const indexOfId = newVotes.indexOf(userId);
      newVotes.splice(indexOfId, 1);
    } else {
      newVotes.push(userId);
    }

    const artUpdtated = {
      votes: newVotes
    };
    const updated = await Art.findByIdAndUpdate(artId, artUpdtated, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

// edit an art of a challenge and user
router.put('/:challengeId/user/update', isLoggedIn(), async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const { challengeId } = req.params;
    const updateArt = req.body;
    const listOfArts = await Art.find({ $and: [{ challenge: challengeId }, { user: userId }] });
    const artId = listOfArts[0]._id;
    const updated = await Art.findByIdAndUpdate(artId, updateArt, { new: true });

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

// get all artsIds with my Id in votes array
router.get('/challenge/:challengeId/artsVoted', isLoggedIn(), async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const { challengeId } = req.params;
    const listOfArts = await Art.find({ $and: [{ challenge: challengeId }, { votes: { $in: userId } }] });
    res.status(200).json({ listOfArts });
  } catch (error) {
    next(error);
  }
});

// eliminar arte (cuando el challenge pasa a voting y en el arte no hay imagen)

module.exports = router;
