const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Task = mongoose.model('Task');
const nodemailer = require('nodemailer');
dotenv.config();

exports.getProjects = async (req, res) => {
  try {
      const projects = await Project.find({}).sort({createdAt: -1});
      res.status(200).json(projects);
  } catch (error) {
    res.status(404).send("data not found");
  }
}


exports.ProjectById = async (req, res) => {
  try {
    const id = req.params.id;;
    console.log('IDDDD,', id);
    const project = await Project.findById(id);
    // const project = await Project.findOne({ _id: id });
    res.status(200).json(project);
  } catch (error) {
    res.status(404).send("data not found");
  }
}

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(200).json(project);
  } catch (error) {
    res.status(403).send({err: error});
  }
}

exports.updateProject = async (req, res) => {
  try {
    const id = req.body.id;
    const body = req.body;
    delete body.id;
    const project = await Project.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json(project);
  } catch (error) {
    res.status(401).send({err: error});
  }
}

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(403).send({err: error});
  }
}

exports.updateTask = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req?.body?.id, body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(401).send("Task error");
  }
}

exports.getTasksByProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const tasks = await Task.find({ projectId: projectId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).send("data not found");
  }
}

exports.sendMessage = (req, res) => {
  try {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_APP_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: req.body.email,
      to: 'to_email@gmail.com',
      subject: req.body.name + ' ' + req.body.email,
      text: req.body.message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({'status': "Email not sent!"});
      } else {
        res.status(200).json({"success": true, response: info.response});
      }
    });

  } catch (error) {
    res.status(500).json({'status': "Error sending message!"});
  }
}