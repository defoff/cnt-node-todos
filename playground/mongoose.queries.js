const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/*var id = '5ae10d0d254e231480ace16c11';

if(!ObjectID.isValid(id)) {
    console.log('id not valid');
}

Todo.find({
    _id: id
}).then(function (todos) {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then(function (todo) {
    console.log('Todo', todo);
});

Todo.findById(id).then(function (todo) {
    if(!todo) {
        return console.log('id not found');
    }
    console.log('Todo By Id', todo);
}).catch(function (e) {

    console.log(e);
});*/

var id = '5ae0f5a17562320428cf1f5c';

User.findById(id).then(function(user) {
    if(!user) {
        return console.log('user not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch(function(e) {
    console.log(e);
});
