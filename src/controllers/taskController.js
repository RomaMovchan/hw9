const taskService = require("../services/taskService");

const createTask = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body);
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await taskService.findTaskById(req.params.id);
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createTask,
    getTaskById
};
