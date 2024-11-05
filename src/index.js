const express = require("express");
const mongoose = require("mongoose");
const userController = require("./controllers/userController");
const taskController = require("./controllers/taskController");
require("./redisClient");

const app = express();
const port = 3000;

app.use(express.json());
mongoose.connect("mongodb://mongo:27017/userdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/user", userController.createUser);
app.put("/user", userController.updateUser);
app.post("/comment", userController.createComment);
app.post("/task", taskController.createTask);
app.post("/task/:id", taskController.getTaskById);
app.get("/user/:id/comments", userController.getUserComments);
app.post("/comments/create-comments", userController.createManyComments);
app.put("/comments/update-comments", userController.updateManyComments);

app.listen(port, () => {
  console.log(process.env.REDIS_URL);
  console.log(`Server running at http://localhost:${port}`);
});
