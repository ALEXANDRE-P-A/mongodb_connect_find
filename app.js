const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const PORT = process.env.PORT || 8080;
const client = new MongoClient(
  "mongodb+srv://atoviag:safada42@cluster0.kbno8nb.mongodb.net/suppier_information?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
  }
);

const getCollection = async _ => {
  try{
    await client.connect();
    const db = client.db("typing_game_texts");
    return db.collection("collection1");
  }catch(err){
    await client.close();
    console.log(err);
  }
};

const getAllData = async _ => {
  const col = await getCollection();
  const cursor = col.find();
  const result = await cursor.toArray();
  return result;
};

const app = express();
app.use(express.json());

app.get("/",async (req, res) => {
  const targetData = await getAllData();
  console.log(targetData);
  res.send(`<h1>Mongodb All data.</h1>${JSON.stringify(targetData)}`);
});

app.listen(PORT,_=>{
  console.log(`Application listening at http://127.0.0.1:${PORT}`);
});