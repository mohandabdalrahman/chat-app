const express = require('express')
const path = require('path')
const socket = require('socket.io')
const app = express()

// static files
app.use(express.static(path.join(__dirname, 'public')))



const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`App listen on port ${PORT}`))

// Socket setup
const io = socket(server)
io.on('connection', socket => {
  console.log('Socket connect', socket.id);
  socket.on('chat', data => {
    io.sockets.emit('chat', data)
  })

  // broadcast
  socket.on('typing', data => {
    socket.broadcast.emit('typing', data)
  })
})