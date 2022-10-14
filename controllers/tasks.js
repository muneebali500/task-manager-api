import { createCustomError } from "../errors/custom-error.js";
import asyncWrapper from "../middlewares/async.js";
import Tasks from "../model/taskSchema.js";

export const createTask = asyncWrapper(async (req, res) => {
  const task = await Tasks.create(req.body);
  res.status(201).json({ task });
});

export const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Tasks.find();
  res.status(200).json({ success: true, tasks });
});

export const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Tasks.findById(id);
  if (!task) {
    return next(createCustomError(`No task with id ${id}`, 404));
  }

  res.status(200).json({ task });
});

export const editSingleTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { name, completed } = req.body;

  await Tasks.findByIdAndUpdate(
    id,
    { name, completed },
    {
      new: true,
      runValidators: true,
    }
  ); // need to pass the option object as 3rd argument to get the laetst task and also run validators-----
  const task = await Tasks.findById(id);

  if (!task) {
    return next(createCustomError(`No task with id ${id}`, 404));
  }

  res.status(200).json({ success: true, task });
});

export const deleteSingleTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const task = await Tasks.findByIdAndDelete(id);

  if (!task) {
    return next(createCustomError(`No task with id ${id}`, 404));
  }

  res.status(200).json({ task });
  // res.status(200).send();
  // res.status(200).json({task: null, status: "success"});
});
