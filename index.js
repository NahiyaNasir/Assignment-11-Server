


const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(
    cors({
      origin:  
                       [
       "http://localhost:5173",
       "https://assigment-11-server-two.vercel.app"
      ],
      credentials: true,
    })
  );
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gze7wpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
 
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

    const volunteerCollection=client.db('volunteerDB').collection('management')
    const requestedCollection=client.db('volunteerDB').collection('requested')
     app.get('/volunteer',async(req,res)=>{
       const curser=volunteerCollection.find()
       const result= await curser.toArray()
       res.send(result)
     })
    //  for search
    //  app.get('/volunteer',async(req,res)=>{
    //   const search=req.body.search
    //   console.log(search)
    //   let quarry={
    //     title:{$regex :search ,$options:'i'}
    //   }
    //   const result=volunteerCollection.findOne(quarry)
    //   res.send(result)
    //   console.log(result)
    //  })

    //  create data for all
   app.post('/volunteer',async(req,res)=>{
    const newItem = req.body;
    // console.log(newItem);
      const result = await volunteerCollection.insertOne(newItem);
       res.send(result)
      // console.log(result);
   })
    //  get id for details
   app.get("/volunteer/:id", async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    const quarry = { _id: new ObjectId(id) };
    const result = await volunteerCollection.findOne(quarry);
    res.send(result);
  })
  //   create new collection
    app.post('/requested',async(req,res)=>{
      const reqItem=req.body
      console.log(reqItem)
      const result=await requestedCollection.insertOne(reqItem)
      res.send(result)
      // const decreesResult=await volunteerCollection.updateOne({$inc:{ number:-1}})
      // res.send(decreesResult)
    })

    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
