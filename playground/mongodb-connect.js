// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// ES& destructuring
/*var user = {name: 'alex', age: '25'};
var {name} = user;
console.log(name);*/

/*var obj = new ObjectID();
console.log(obj);*/

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, client) {
    if(err){
        console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    db.collection('TodoApp').insertOne({
       text: "Somethings to do",
       completed: true
    }, function (err, result) {
        if (err) {
            return console.log('Unable to insert todo', err)
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

/*    db.collection('TodoApp').insertOne({
        name: "Alex",
        age: "23",
        location: "Berlin"
    }, function (err, result) {
        if (err) {
            return console.log('Unable to insert item', err)
        }
        console.log(JSON.stringify(result.ops, undefined, 2));

        console.log(result.ops[0]._id.getTimestamp());
    });*/

    client.close();
});
