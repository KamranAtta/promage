const Project = require("../controllers/Project.Controller");
const Auth = require('../middleware/auth');

module.exports = (project) => {

  // Talks24
  project.get("/getProjects", Auth.authenticateUser, Project.getProjects);
  project.get("/projects/:id", Auth.authenticateUser,  Project.ProjectById);
  project.post("/createProject", Auth.authenticateUser, Project.createProject);
  project.post("/updateProject", Auth.authenticateUser, Project.updateProject);
  project.post("/createTask", Auth.authenticateUser, Project.createTask);
  project.post("/updateTask", Auth.authenticateUser, Project.updateTask);
  project.get("/projects/:projectId/tasks", Auth.authenticateUser,  Project.getTasksByProject);

  project.post("/sendMessage", Auth.authenticateUser, Project.sendMessage);

};