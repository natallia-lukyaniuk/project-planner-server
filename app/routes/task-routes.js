var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/tasks/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('tasks').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
              const userDetails = { '_id': new ObjectID(item.userId) };
              db.collection('users').findOne(userDetails, (err, user) => {
                if (err) {
                  res.send({'error': 'An error has occurred'});
                } else {
                  const task = Object.assign({}, item, {user: user});
                  res.send(task);
                }
              })
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
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        userId: req.body.userId,
        projectId: req.body.projectId,
        type: req.body.type,
        number: req.body.number,
        description: req.body.description,
        status: req.body.status
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
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          userId: req.body.userId,
          projectId: req.body.projectId,
          type: req.body.type,
          number: req.body.number,
          description: req.body.description,
          status: req.body.status
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