// consts
const express = require('express');
const { read } = require('fs');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/projet', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}) .then( () => {
    console.log('connected to mongodb'); 
}) .catch( (error) => {
    console.error('error connecting to mongodb: ', error);
});


const projectSchema = new mongoose.Schema ({
    name: String,
    category: String,
    status: Number,
    lead: String,
    description: String
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

app.post('/create-project', async (req, res) => {
    try {
      const projectData = new Project(req.body);
      const savedProject = await projectData.save();
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

app.listen(3000, () => {
    console.log('on port 3000');
})