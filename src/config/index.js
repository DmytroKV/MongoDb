const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/mongoose_basics', {useNewUrlParser : true, useUnifiedTopology: true},
function(err)
{
    if(err) throw err;
    console.log('Connected successfully!')
});
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