require('dotenv').config()
const express = require('express')
const connectToMongo = require('./connectDb')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000


connectToMongo();

app.use(express.json());
app.use(cors(
  {
    origin: "https://mosaic-zeta-flax.vercel.app/",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
));

app.get('/', (req, res) => {
  res.send('Hello Abhrajit!')
})


app.use("/api/auth", require("./routes/auth"))
app.use("/api/posts", require("./routes/posts"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})