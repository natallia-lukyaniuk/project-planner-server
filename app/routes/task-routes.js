var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/tasks/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('tasks').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
    app.get('/tasks', (req, res) => {
      db.collection('tasks').find().toArray((err, items) => {
        res.send(items);
      });
    });
    app.delete('/tasks/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      db.collection('tasks').remove(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send('task ' + id + ' deleted!');
        } 
      });
    });
    app.post('/tasks', (req, res) => {
      const task = {
        title: req.body.title,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        user_id: req.body.user_id,
        project_id: req.body.project_id,
      };
      db.collection('tasks').insert(task, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });
    app.put ('/tasks/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const task = {
          title: req.body.title,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          user_id: req.body.user_id,
          project_id: req.body.project_id,
        };
        db.collection('tasks').update(details, task, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(task);
          } 
        });
    });
  };