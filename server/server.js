require('./config/config');
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {authenticate} = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());

app.post('/todos', function (req, res) {
    console.log(req.body);
   var todo = new Todo({
        text: req.body.text
    });
    todo.save().then( function (doc) {
        res.send(doc);
    }, function (e) {
        res.status(400).send(e);
    });
});

app.get('/todos', function (req, res) {
    Todo.find().then(function (todos) {
        res.send({todos});
    }, function (e) {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', function (req, res) {
   var id = req.params.id;
   if(!ObjectID.isValid(id)) {
       return res.status(404).send();
   }
   Todo.findById(id).then(function (todo) {
       if(!todo) {
           return res.status(404).send();
       }
       res.send({todo});
   }).catch(function (e) {
      res.status(400).send();
   });
});

app.delete('/todos/:id', function (req, res) {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).end();
    }
    Todo.findByIdAndRemove(id).then(function (todo) {
        if (!todo) {
            return res.status(404).end();
        }
        res.status(200).send({todo});
    }).catch(function (e) {
        res.status(404).send();
    })
});

app.patch('/todos/:id', function (req, res) {
   var id = req.params.id;
   var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).end();
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then(function (todo) {
        if (!todo) {
            return res.status(404).end();
        }
        res.send({todo});
    }).catch(function (e) {
        res.status(400).send();
    })
});

app.post('/users', function (req, res) {
    // get email and password
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.save().then(function (user) {
        return user.generateAuthToken();
    }).then(function (token) {
       res.header('x-auth', token).send(user);
    }).catch(function (e) {
        res.status(400).send(e);
    });
});


app.get('/users/me', authenticate, function (req, res) {
    res.send(req.user);
});

app.listen(port, function() {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app: app
};