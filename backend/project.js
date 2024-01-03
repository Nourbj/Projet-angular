// consts
const express = require('express');
const { read } = require('fs');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/projet");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log('DB Connected successfully!');
});


// Project CRUD
const projectSchema = new mongoose.Schema ({
    name: String,
    category: String,
    description: String
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

app.post('/create-project', async (req, res) => {
  try {
      const projectData = new Project(req.body);
      const savedProject = await projectData.save();
      console.log('Project data received:', req.body);
      console.log('Project saved:', savedProject);
      res.json(savedProject);
  } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Error creating project', details: error.message });
  }
});

app.get('/get-projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Error fetching projects', details: error.message });
  }
});



// Task CRUD
const taskSchema = new mongoose.Schema({
  title : String,
  description : String,
  due_date : Date,
  owner : String,
  priority : String,
  state : String,
  category : String,
  assignee : String
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;

app.post('/create-task', async (req, res) => {
  try {
      const taskData = new Task(req.body);
      const savedTask = await taskData.save();
      console.log('Task data received:', req.body);
      console.log('Task saved:', savedTask);
      res.json(savedTask);
  } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Error creating task', details: error.message });
  }
});

app.get('/get-tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Error fetching tasks', details: error.message });
  }
});



// Comment CRUD
const commentSchema = new mongoose.Schema({
  message : String,
  time : Date,
  writer : String
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

app.post('/create-comment', async (req, res) => {
  try {
      const commentData = new Comment(req.body);
      const savedComment = await commentData.save();
      console.log('Comment data received:', req.body);
      console.log('Comment saved:', savedComment);
      res.json(savedComment);
  } catch (error) {
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Error creating comment', details: error.message });
  }
});

app.get('/get-comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Error fetching comments', details: error.message });
  }
});








app.listen(3000, () => {
    console.log('on port 3000');
})