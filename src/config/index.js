const mongoose = require('mongoose');
const express = require('express');
const app = express();
const {MongoClient} = require('mongodb');
const morgan = require('morgan')
const PORT = process.env.PORT || 8080;
const uri = "mongodb+srv://dbUser:qB7viqjbHjkdfa9@cluster0.otyvk.mongodb.net/test";

//const mongoConnection = mongoose.createConnection(uri);

mongoose.connect(uri, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});
mongoose.connection.on('connected', () => {
    console.log('Connected on port', mongoose.connection.port);
})
/*
var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.on('open', () => {
    connection.db.collection("myUsers", function(err, collection){
        collection.find({}).toArray(function(err, data){
            console.log(data); // it will print your collection data
        })
    });
})
*/


//Defining schema
const Schema = mongoose.Schema;
const myUsersSchema = new Schema({
    item: String,
    qty: Number,
    size: {
        h : Number,
        w : Number,
        uom: String
    },
    status: String
});

const data = {
    item: 'Some item 1',
    qty: 1,
    size: {
        h: 25,
        w: 20,
        uom: 'cm'
    },
    status: 'B'
};
const myUsers = mongoose.model('myUsers', myUsersSchema);

const newMyUsers = new myUsers(data);
//saving data to MongoDB
/*
newMyUsers.save((error) => {
    if(error) 
    {
    console.log('Error occured while saving!')
    }
    else{
        console.log('Data has been saved!')
    }
});
*/


app.get("/api", (req, res) => {
    myUsers.find({}).then((data) => {
        console.log('Data: ', data);
        res.json(data);
    }).catch((error) => {
        console.log('error: ', error)
    });
    res.json(data);
});

//Model

/*
connection.on('open', function () {
    connection.db.listCollections().toArray(function (err, names) {
      if (err) {
        console.log(err);
      } else {
        console.log(names);
      }

      mongoose.connection.close();
    });
});
*/
/*
connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
    //trying to get collection names
    
    connection.db.listCollections().toArray(function (err, names) {
        console.log(names); // [{ name: 'dbname.myCollection' }]
        module.exports.Collection = names;
    });
    
})
*/
    /*
function(err)
{
    if(err) throw err;
    console.log('Connected successfully!')
});
*/
/*
async function main(){

    const uri = "mongodb+srv://dbUser:qB7viqjbHjkdfa9@cluster0.otyvk.mongodb.net/test";


    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await  listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);
*/
/*
mongoose.connect('mongodb://localhost/mongoose_basics', {useNewUrlParser : true, useUnifiedTopology: true},
function(err)
{
    if(err) throw err;
    console.log('Connected successfully!')
});
*/

/*
mongoose.connect('mongodb://localhost/test', {useNewUrlParser : true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error!'));
db.once('open', function(){
})
*/
/*
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
app.listen(5000, () => {
    console.log("App is listening on Port 5000")
})
*/