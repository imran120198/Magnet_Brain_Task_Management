const { Router } = require("express");
const { TaskModel } = require("../Model/Task.model");

const TaskRouter = Router();

// Getting All Task Data
TaskRouter.get("/", async (req, res) => {
  try {
    const task = await TaskModel.find();
    res.send({ message: "Getting Task Data", task });
  } catch (err) {
    res.send("Something wrong in getting task data");
  }
});

// Getting Task Data by ID
TaskRouter.get("/:id", async (req, res) => {
  try {
    const taskId = await TaskModel.findById(req.params.id);
    res.send({ message: "Getting Task Data by Id", taskId });
  } catch (err) {
    res.send("Something wrong in getting task data by ID");
  }
});

// Create a Task
TaskRouter.post("/create", async (req, res) => {
  try {
    const { title, description, duedate, priority } = req.body;
    const newTask = new TaskModel({
      title,
      description,
      duedate,
      priority,
    });
    await newTask.save();
    res.send({ message: "Successfully Create a Task" });
  } catch (err) {
    res.send({ message: "Something Wrong in creating Data", err });
  }
});

// Update Task
TaskRouter.put("/update/:id", async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (task) {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.dueDate = req.body.dueDate || task.dueDate;
      task.priority = req.body.priority || task.priority;

      const updatedTask = await task.save();
      res.send({ message: "Update Successfully", updatedTask });
    } else {
      res.send({ message: "Task not found" });
    }
  } catch (err) {
    res.send({ message: "Something Wrong with Update", err });
  }
});

TaskRouter.delete("/delete/:id", async (req, res) => {
  try {
    const deleteTask = await TaskModel.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      res.send("Something Wrong with Delete");
    } else {
      res.send({ message: "Task Delete Successfully", deleteTask });
    }
  } catch (err) {
    res.send({ message: "Something Wrong with deleting Task", err });
  }
});

module.exports = {
  TaskRouter,
};
