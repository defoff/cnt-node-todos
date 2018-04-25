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

    /*    db.collection('TodoApp').find({completed: true}).toArray().then( function(docs) {
            console.log('Todos');
            console.log(JSON.stringify(docs, undefined, 2));
        }, function (err) {
            console.log('Unable to fetch documents', err);
        });*/

/*    db.collection('TodoApp').deleteOne({text: 'Eat lunch'}).then( function(result) {
       console.log(result);
    });*/

    db.collection('TodoApp').findOneAndDelete({completed: false}).then( function(result) {
        console.log(result);
    });


    // client.close();
});
