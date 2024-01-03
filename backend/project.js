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


// Suppression d'un projet
app.delete('/delete-project/:projectId', async (req, res) => {
  const projectId = req.params.projectId;

  try {
    console.log('Deleting project with ID:', projectId);

    // Vérifiez si projectId est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      console.log('Invalid project ID');
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    // Trouvez et supprimez le projet
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      console.log('Project not found');
      return res.status(404).json({ error: 'Project not found' });
    }

    console.log('Project deleted successfully');
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Error deleting project', details: error.message });
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




app.delete('/delete-task/:taskId', async (req, res) => {
  const taskId = req.params.taskId;

  try {
    console.log('Deleting task with ID:', taskId);

    // Check if taskId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      console.log('Invalid task ID');
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    // Find and delete the task
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      console.log('Task not found');
      return res.status(404).json({ error: 'Task not found' });
    }

    console.log('Task deleted successfully');
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Error deleting task', details: error.message });
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