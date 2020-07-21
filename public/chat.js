const socket = io('http://localhost:5000');
let message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  output = document.getElementById('output'),
  send = document.getElementById('send'),
  feedback = document.getElementById('feedback'),
  submitForm = document.getElementById('submitForm')


// emit message
submitForm.addEventListener('submit', (e) => {
  e.preventDefault()
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  })
  message.value = ''
})
// broadcast event
message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value)
})


// listen for events
socket.on('chat', ({ message, handle }) => {
  feedback.innerHTML = ''
  output.innerHTML += `<p><strong>${handle}:</strong> ${message}</p>`
})

// listen for broadcast
socket.on('typing', handleName => {
  feedback.innerHTML = `<p><em>${handleName} is typing a message...</em></p>`
})