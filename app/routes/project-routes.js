var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/projects/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('projects').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
              const taskDetails = { 'projectId': id };
              db.collection('tasks').find(taskDetails).toArray((err, items) => {
                const project = Object.assign({}, item, {tasks: items});
                res.send(project);
              });
            }
        });
    });
    app.get('/projects', (req, res) => {
      db.collection('projects').find().toArray((err, items) => {
        res.send(items);
      });
    });
    app.delete('/projects/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      db.collection('projects').remove(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send('project ' + id + ' deleted!');
        } 
      });
    });
    app.post('/projects', (req, res) => {
      const project = {
        title: req.body.title,
        avatar: req.body.avatar,
        description: req.body.description
      };
      db.collection('projects').insert(project, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });
    app.put ('/projects/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const project = {
            title: req.body.title,
            avatar: req.body.avatar,
            description: req.body.description
        };
        db.collection('projects').update(details, project, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(project);
          } 
        });
    });
  };