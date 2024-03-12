const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    startDate: { type:Date },
    endDate: { type:Date },
    description:{ type: String },
    createdAt:{ type:Date, default: Date.now }
}, { toJSON: { getters: true } });
module.exports = mongoose.model('Task', TaskSchema);