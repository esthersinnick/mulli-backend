const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const challengeSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  startVotingDate: {
    type: Date,
    required: true
  },
  endVotingDate: {
    type: Date,
    required: true
  },
  description: String,
  creator: { type: ObjectId, ref: 'User' },
  illustrators: Number,
  totalVotes: Number

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
