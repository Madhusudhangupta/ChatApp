require('dotenv').config()
const express = require('express')
const cors = require('cors')
const http = require('http')
const connectSocket = require('./socket/ConnectSocket')
const checkHealthRoute = require('./routes/CheckHealthRoute')
const fileDownloadRoute = require('./routes/FileDownloadRoute')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 8000

// middleware
app.use(cors())
app.use(express.json())


// routes
app.use(checkHealthRoute)
app.use(fileDownloadRoute)

// start server
server.listen(port, (error) => {
    if(!error) {
        console.log(`Server is running at the port ${port}`)
    }
    else {
        console.log(`Error: ${error}`);
    }
})

// initialize socket
connectSocket(server)