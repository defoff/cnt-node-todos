const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.findByIdAndRemove('5ae3933f4d58da29f024c468').then(function (todo) {
    console.log(todo);
});

ToDo.findOneAndRemove({_id: '5ae3933f4d58da29f024c468'}).then(function (todo) {
   console.log(todo);
});