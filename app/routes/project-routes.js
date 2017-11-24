var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/projects/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('projects').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
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
      console.log(req.body);
      const project = {
        tasks: req.body.tasks,
        title: req.body.title,
        avatar: req.body.avatar
      };
      db.collection('projects').insert(project, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          console.log(result);
          res.send(result.ops[0]);
        }
      });
    });
    app.put ('/projects/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const project = {
            tasks: req.body.tasks,
            title: req.body.title,
            avatar: req.body.avatar
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