var ObjectID = require('mongodb').ObjectID;
var async = require('async');

module.exports = function(app, db) {
    app.get('/projects/:id/members', (req, res) => {
      const id = req.params.id;
      const memberDetails = { 'projectId': id };
      const users = [];
      db.collection('project_user').find(memberDetails).toArray((err, items) => {
        async.map(items, (item, next) => {
          const memberId = { '_id': new ObjectID(item.userId) };
          db.collection('users').findOne(memberId, (err, user) => {
            next(err, user);
          });
        },
        function (err, users) {
          res.send(users);
        });
      });
    });
    app.delete('/projects/:id/delete', (req, res) => {
      const id = req.params.id;
      const details = { '_id': new ObjectID(id) };
      const project_user = {
        projectId: req.params.id,
        userId: req.query.memberId
      };
      db.collection('project_user').remove(project_user, (err, item) => {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          res.send('project ' + id + ' deleted!');
        }
      });
    });
    app.post('/projects/:id/add', (req, res) => {
      const project_user = {
        projectId: req.params.id,
        userId: req.query.memberId
      }
      db.collection('project_user').insert(project_user, (err, result) => {
        if (err) { 
          res.send({ 'error': 'An error has occurred' }); 
        } else {
          res.send(result.ops[0]);
        }
      });
    });
  };