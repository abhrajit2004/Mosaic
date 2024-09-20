require('dotenv').config()
const express = require('express')
const connectToMongo = require('./connectDb')
const app = express()
const cors = require('cors')
const port = 3000

connectToMongo();

app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
  res.send('Hello Abhrajit!')
})


app.use("/api/auth", require("./routes/auth"))
app.use("/api/posts", require("./routes/posts"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})