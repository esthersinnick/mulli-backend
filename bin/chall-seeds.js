'use strict';

const mongoose = require('mongoose');

// setup mongoose
mongoose.connect('mongodb://localhost/mulliApp', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const User = require('../models/User.js');

const seeds = [
  {
    name: 'PS4 Skin design Challenge',
    startDate: '14 Aug 2019',
    endDate: '19 Aug 2019',
    startVotingDate: '20 Aug 2019',
    endVotingDate: "22 Aug 2019'",
    description: 'Design a dope skin that will blow the mind of your fellow designers. It is a white canvas, so go crazy!',
    creator: '5d540b35d33eaa496d0da5d3',
    illustrators: 0,
    totalVotes: 0
  }
];

User.create(seeds).then((users) => {
  console.log(users);
  mongoose.connection.close();
}).catch((error) => {
  console.log(error);
});

/*

{
  "name":"PS4 Skin design Challenge",
  "startDate":"14 Aug 2019",
  "endDate":"19 Aug 2019",
  "startVotingDate":"20 Aug 2019",
  "endVotingDate":"22 Aug 2019'",
  "description":"Design a dope skin that will blow the mind of your fellow designers. It is a white canvas, so go crazy!",
  "creator":"5d540b35d33eaa496d0da5d3",
  "illustrators": 0,
  "totalVotes": 0
}

*/
