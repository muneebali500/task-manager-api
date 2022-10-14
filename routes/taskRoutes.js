import express from "express";
import {
  createTask,
  deleteSingleTask,
  editSingleTask,
  getAllTasks,
  getSingleTask,
} from "../controllers/tasks.js";

const router = express.Router();

router.route(`/`).post(createTask).get(getAllTasks);
router
  .route(`/:id`)
  .get(getSingleTask)
  .patch(editSingleTask)
  .delete(deleteSingleTask);

export default router;
