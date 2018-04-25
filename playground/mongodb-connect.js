const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, client) {
    if(err){
        console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    db.collection('TodoApp').insertOne({
       text: "Somethings to do",
       completed: false
    }, function (err, result) {
        if (err) {
            return console.log('Unable to insert todo', err)
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});