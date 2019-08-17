const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const artSchema = new Schema({

  user: { type: ObjectId, ref: 'User' },
  challenge: { type: ObjectId, ref: 'Challenge' },
  images: [{ type: String }],
  votes: [{ type: ObjectId, ref: 'User' }],
  rankingPosition: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Art = mongoose.model('Art', artSchema);

module.exports = Art;
