const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name:{ type: String },
  description:{ type: String },
  manager:{ type: String },
  startDate: { type: Date},
  endDate: { type: Date},
  isRunning:{ type: Boolean },
  createdAt:{ type:Date, default: Date.now }
}, { toJSON: { getters: true } });
module.exports = mongoose.model('Project', ProjectSchema);