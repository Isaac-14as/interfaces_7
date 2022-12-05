const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;


// mongoose.connect('mongodb+srv://User_test:naz142227@cluster0.leybdqn.mongodb.net/?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://dmitriy:naz142227@cluster0.leybdqn.mongodb.net/?retryWrites=true&w=majority');

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://dmitriy:naz142227@cluster0.leybdqn.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("bd_mn").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));


const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));


app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});