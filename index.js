const express = require('express');
const cors = require('cors');
const app =express();
const port = process.env.PORT|| 5000;
require ('dotenv').config()
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');

// middleware using

app.use(cors());
app.use(express.json());



//  creating database



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kit4epp.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

const assignmentcollection = client.db('assignment').collection('assignments')

app.get('/createdassignments',async(req,res)=>{
    const cursor = assignmentcollection.find()
    const result = await cursor . toArray()
    res.send(result)
})

app.post('/createdassignments',async(req,res)=>{
    const assignment= req.body
    console.log(assignment);
    const result = await assignmentcollection.insertOne(assignment)
    res.send(result)
})

app.delete('/createdassignments/:id',async(req,res)=>{

  const id=req.params.id;
  const query = {_id : new ObjectId(id)}
  const result = await assignmentcollection.deleteOne(query)
  res.send(result)

})

  


app.get('/', (req,res)=>{
    res.send('assignment is running bro')
})

app.listen( port, () =>{
    console.log(`assignment is running on ${port}`);
})