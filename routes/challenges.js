'use strict';

const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');
const Art = require('../models/Art');
const {
  isLoggedIn,
  isAdmin
} = require('../helpers/middlewares');

// // get all challenges
// router.get('/', async (req, res, next) => {
//   try {
//     const listOfChallenges = await Challenge.find();
//     res.status(200).json({ listOfChallenges });
//   } catch (error) {
//     next(error);
//   }
// });

// get all challenges and number of participants
router.get('/', (req, res, next) => {
  Challenge.find()
    .then((challenges) => {
      Art.find()
        .then((arts) => {
          const newChallenge = [...challenges].map((challenge) => {
            let count = 0;
            arts.forEach(art => {
              art.challenge.toString() === challenge._id.toString() && count++;
            });
            const newChallenge = challenge;
            newChallenge['illustrators'] = count;
            return newChallenge;
          });
          res.status(200).json(newChallenge);
        });
    });
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
router.post('/add', isLoggedIn(), isAdmin(), async (req, res, next) => {
  try {
    const userId = req.session.currentUser._id;
    const newChallenge = req.body;
    newChallenge.creator = userId;
    const createdChallenge = await Challenge.create(newChallenge);
    res.status(200).json(createdChallenge);
  } catch (error) {
    next(error);
  }
});

// edit a challenge
router.put('/:challengeId/edit', isLoggedIn(), isAdmin(), async (req, res, next) => {
  const { challengeId } = req.params;
  const challengeUpdated = req.body;
  try {
    const updated = await Challenge.findByIdAndUpdate(
      challengeId,
      challengeUpdated,
      { new: true }
    );
    if (challengeUpdated.status !== 'active') {
      await deleteArtsOnVoting(challengeId);
    }
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

// delete a challenge
router.delete('/:challengeId/delete', isLoggedIn(), isAdmin(), async (req, res, next) => {
  const { challengeId } = req.params;
  try {
    await Challenge.findByIdAndDelete(challengeId);
    await Art.remove({ challenge: challengeId });
    res.status(200).json({ message: 'challenge deleted' });
  } catch (error) {
    next(error);
  }
});

// eliminar arte (cuando el challenge pasa a voting o clsed y en el arte no hay imagen)

const deleteArtsOnVoting = (challengeId) => Art.remove({ $and: [{ challenge: challengeId }, { images: { $size: 0 } }] });

module.exports = router;
