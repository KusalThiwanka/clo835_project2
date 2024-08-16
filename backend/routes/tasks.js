router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});

router.post("/tasks", async (req, res) => {
  try {
    const newtask = new Task({ text: req.body.text });
    const savedTask = await newtask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.end();
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});


// const router = require("express").Router();
// const Task = require("../models/Task");

// router.get("/tasks", async (req, res) => {
//   const tasks = await Task.find();
//   res.json(tasks);
// });

// router.post("/tasks", async (req, res) => {
//   const newtask = new Task({
//     text: req.body.text,
//   });
//   const savedTask = await newtask.save();
//   res.json(savedTask);
// });

// router.delete("/tasks/:id", async (req, res) => {
//   await Task.findByIdAndDelete(req.params.id);
//   res.end();
// });

// module.exports = router;
