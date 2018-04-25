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

    db.collection('TodoApp').findOneAndUpdate({
        name: 'Alex'
    }, {
        $inc: {
            age: -2
        }
    }, {
        returnOriginal: false
    }).then( function(result){
       console.log(result);
    });


    // client.close();
});
