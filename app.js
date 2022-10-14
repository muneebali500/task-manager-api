import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

import taskRoutes from "./routes/taskRoutes.js";
import { connectDb } from "./db/connect.js";
import notFound from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";

const app = express();

app.use(express.static(`public`));
app.use(express.json());

app.use(`/api/v1/tasks`, taskRoutes);
app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT | 3000;

async function start() {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`app is listening at port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();
