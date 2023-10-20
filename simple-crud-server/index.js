const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json())


const {
    MongoClient,
    ServerApiVersion
} = require('mongodb');
const uri = "mongodb+srv://sharifrony725:ErqVzE3QuJoYEGfn@cluster0.9nwpjka.mongodb.net/?retryWrites=true&w=majority";

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
        await client.connect();

        const database = client.db("usersDB");
        const userCollection = database.collection("users")

        app.post('/users', async(req, res) =>{
            const user = req.body
            console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({
            ping: 1
        });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Simple Crud is ok Running')
})

app.listen(port, ()=>{
    console.log(`Simple Crud is running on port, ${port}`);
})