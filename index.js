const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ssblxww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const servicesCollection = client
      .db("assignment11DB")
      .collection("services");

    // Send a ping to confirm a successful connection

    // post service-------------------------
    app.post("/service", async (req, res) => {
      const newService = req.body;
      console.log(newService);
      const result = await servicesCollection.insertOne(newService);
      res.send(result);
    });

    // get all data at home page
    app.get("/service", async (req, res) => {
      const cursor = servicesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // get data throw of the email
    app.get("/item/:email", async (req, res) => {
      const query = { providerEmail: req.params.email };
      const result = await servicesCollection.find(query).toArray();
      res.send(result);
    });

    // delete service item
    app.delete("/item/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await servicesCollection.deleteOne(query);
      res.send(result);
    });

    //update service item
    app.get("/item/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
    });

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("assignment 11 is running");
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
