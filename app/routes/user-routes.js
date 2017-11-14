var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
    app.get('/users', (req, res) => {
      db.collection('users').find().toArray((err, items) => {
        res.send(items);
      });
    });
    app.delete('/users/:id', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      db.collection('users').remove(details, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send('user ' + id + ' deleted!');
        } 
      });
    });
    app.post('/users', (req, res) => {
      const user = {
        login: req.body.login,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        avatar: req.body.avatar,
        title: req.body.title
      };
      db.collection('users').insert(user, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });
    app.put ('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const user = {
          login: req.body.login,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          password: req.body.password,
          avatar: req.body.avatar,
          title: req.body.title
        };
        db.collection('users').update(details, user, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(user);
          } 
        });
    });
  };