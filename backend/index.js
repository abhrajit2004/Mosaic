require('dotenv').config()
const express = require('express')
const connectToMongo = require('./connectDb')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000


connectToMongo();

app.use(express.json());

app.use(cors({
  origin: 'mosaic-backend.vercel.app',
  credentials: true,
  maxAge: 86400,
  allowedHeaders: ['Content-Type', 'auth-token'],
  exposedHeaders: ['auth-token'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
}));

app.options('*', cors());

app.get('/', (req, res) => {
  res.send('Hello Abhrajit!')
})


app.use("/api/auth", require("./routes/auth"))
app.use("/api/posts", require("./routes/posts"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})