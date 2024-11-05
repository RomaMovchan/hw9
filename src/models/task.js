const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
      title: String,
      description: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { versionKey: false, timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);