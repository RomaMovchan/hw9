const Task = require("../models/task");
const client = require("../redisClient");

const findTaskById = async (taskId) => {
  const cacheKey = `task:${taskId}`;
  const cachedTask = await client.get(cacheKey);
  if (cachedTask) {
    return JSON.parse(cachedTask);
  }
  const task = await Task.findById(taskId);
  if (task) {
    await client.set(cacheKey, JSON.stringify(task), { EX: 6000 });
  }
  return task;
};

const createTask = async (data) => {
  const task = new Task(data);
  const newTask = await task.save();
  const cacheKey = `task:${newTask._id}`;
  await client.set(cacheKey, JSON.stringify(newTask), { EX: 6000 });
  return newTask;
};

module.exports = {
  findTaskById,
  createTask
};
