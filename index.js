const express = require('express')
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nre1huw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const databaseCollection = client.db('dataCollection').collection('userList');

        app.post('/list', async (req, res) => {
            const doc = req.body;
            const result = await databaseCollection.insertOne(doc);
            res.send(result)
        })

    } finally {

    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is Running')
})

app.listen(port, () => {
    console.log('connected')
})