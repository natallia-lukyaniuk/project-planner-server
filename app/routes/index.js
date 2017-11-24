const userRoutes = require('./user-routes');
const projectRoutes = require('./project-routes');
const taskRoutes = require('./task-routes');
// const projectUserRoutes = require('./project-user-routes');

module.exports = function(app, db) {
  userRoutes(app, db);
  projectRoutes(app, db);
  taskRoutes(app, db);
  // projectUserRoutes(app, db);
};