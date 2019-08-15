const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const challengeSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  startDate: Date,
  endDate: Date,
  startVotingDate: Date,
  endVotingDate: Date,
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
