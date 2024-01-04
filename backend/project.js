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

/////
app.get('/get-project/:projectId', async (req, res) => {
  const projectId = req.params.projectId;

  try {
    // Utilisez Mongoose pour récupérer les détails du projet depuis la base de données
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ error: 'Error fetching project details', details: error.message });
  }
});

/// update project
app.put('/edit-project/:projectId', async (req, res) => {
  const projectId = req.params.projectId;
  const updatedProjectData = req.body;

  try {
    // Use Mongoose to update the project in the database
    const updatedProject = await Project.findByIdAndUpdate(projectId, updatedProjectData, { new: true });

    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Error updating project', details: error.message });
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
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project' 
  },
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
    const projectId = req.body.project_id;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      console.log('Invalid project ID');
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const projectExists = await Project.findById(projectId);

    if (!projectExists) {
      console.log('Project not found');
      return res.status(404).json({ error: 'Project not found' });
    }

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

app.get('/get-tasks/:projectId', async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const tasks = await Task.find({ project_id: projectId });

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

// Get task details
app.get('/task-details/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error fetching task details:', error);
    res.status(500).json({ error: 'Error fetching task details', details: error.message });
  }
});


// Get a single task by ID for update
app.get('/get-task/:taskId', async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const task = await Task.findById(taskId);

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error('Error fetching task details:', error);
    res.status(500).json({ error: 'Error fetching task details', details: error.message });
  }
});


// Update task
app.put('/update-task/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  const updatedTaskData = req.body;

  try {
    console.log('Received PUT request for task ID:', taskId);

    // Ajoutez un log pour voir les données mises à jour
    console.log('Updated task data:', updatedTaskData);

    // Vérifiez si taskId est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      console.log('Invalid task ID');
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    // Ajoutez un log pour voir si la recherche et la mise à jour fonctionnent
    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true });

    if (!updatedTask) {
      console.log('Task not found');
      return res.status(404).json({ error: 'Task not found' });
    }

    console.log('Task updated successfully');
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error updating task', details: error.message });
  }
});




// Comment CRUD
const commentSchema = new mongoose.Schema({
  task_id : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task' 
  },
  message : String,
  time : Date,
  writer : String
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

app.post('/create-comment', async (req, res) => {
  try {
    const taskId = req.body.task_id;

    // Validate if taskId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      console.log('Invalid task ID');
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const taskExists = await Task.findById(taskId);

    if (!taskExists) {
      console.log('Task not found');
      return res.status(404).json({ error: 'Task not found' });
    }

    const commentData = new Comment({
      task_id: taskId,
      message: req.body.message, 
      time: req.body.time,
      writer: req.body.writer 
    });

    const savedComment = await commentData.save();
    console.log('Comment data received:', req.body);
    console.log('Comment saved:', savedComment);
    res.json(savedComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Error creating comment', details: error.message });
  }
});

app.get('/get-comments/:taskId', async (req, res) => {
  try {
    const taskId = req.params.taskId;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      console.log('Invalid task ID');
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const comments = await Comment.find({ task_id: taskId });
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Error fetching comments', details: error.message });
  }
});

// Delete a comment by ID
app.delete('/delete-comment/:commentId', async (req, res) => {
  const commentId = req.params.commentId;

  try {
    console.log('Deleting comment with ID:', commentId);

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      console.log('Invalid comment ID');
      return res.status(400).json({ error: 'Invalid comment ID' });
    }

    // Find and delete the comment
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      console.log('Comment not found');
      return res.status(404).json({ error: 'Comment not found' });
    }

    console.log('Comment deleted successfully');
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Error deleting comment', details: error.message });
  }
});






app.listen(3000, () => {
    console.log('on port 3000');
})