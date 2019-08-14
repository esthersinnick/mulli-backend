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
    isAdmin: true,
    name: 'Esther',
    username: 'estherbernalart',
    email: 'estheradmin@mail.com',
    password: '$2b$10$mcPy3Qtj58w1q0dtQ8DJse0J3RKrMLx0eXCsLHHEEScTogvutdkFS',
    instagram: '',
    website: '',
    avatar: '',
    challenges: []
  },
  {
    isAdmin: false,
    name: 'Esther',
    username: 'esthersinnick',
    email: 'esther@mail.com',
    password: '$2b$10$mcPy3Qtj58w1q0dtQ8DJse0J3RKrMLx0eXCsLHHEEScTogvutdkFS',
    instagram: '',
    website: '',
    avatar: '',
    challenges: []
  }
];

User.create(seeds).then((users) => {
  console.log(users);
  mongoose.connection.close();
}).catch((error) => {
  console.log(error);
});
