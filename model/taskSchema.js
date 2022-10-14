import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Must provide name`],
    trim: true,
    maxLength: [20, `Must not be longer than 20 words`],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Tasks = mongoose.model(`Task`, taskSchema);

export default Tasks;
