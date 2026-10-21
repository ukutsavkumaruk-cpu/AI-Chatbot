const express = require('express')
const http = require('http')
const cors = require("cors");
require("dotenv").config();
const {get404} = require('./controllers/errors')
const queryRouter = require('./routes/queryRouter')


const app = express()
const server = http.createServer(app);


app.use(express.urlencoded())
app.use(cors())
app.use(express.json())
app.use('/api/chat',queryRouter)
app.use(get404)

const PORT = 3010;

server.listen(PORT,()=>{
  console.log(`Server is running at http://localhost:${PORT}`)
})
