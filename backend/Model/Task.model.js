const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  duedate: { type: Date, default: Date },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium",
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = {
  TaskModel,
};
