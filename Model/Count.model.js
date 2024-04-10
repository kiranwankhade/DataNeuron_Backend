const mongoose = require('mongoose');

const countSchema = new mongoose.Schema({
  key: { type: String, default: "counts" },
  addCount: { type: Number, default: 0 },
  updateCount: { type: Number, default: 0 }
}, {
  versionKey: false
});

const CountModel = mongoose.model('Count', countSchema);

module.exports = { CountModel };
