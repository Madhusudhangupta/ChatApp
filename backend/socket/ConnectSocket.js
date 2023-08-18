const socketIO = require('socket.io')
const { onJoinRoomEvent, onGetRoomUsersEvent } = require('./SocketEvents')
const fileUpload = require('../FileHandler/FileUpload')
const deleteScheduler = require('../FileHandler/DeleteScheduler')

const connectSocket = (server) => {
    io = new socketIO.Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
        // set the maximum HTTP request size to 100MB
        maxHttpBufferSize: 100*1024*1024,
    })


    io.on('connection', (socket) => {
        console.log(`A user connected with ID: ${socket.id}`)
        // joining the room
        socket.on('joinRoomEvent', (data) => {
            onJoinRoomEvent(data, socket, io)
        })

        //message
        socket.on('sendMessageEvent', (data) => {
            if(data.TYPE === 'MESSAGE') {
                // broadcast the message to all clients connected to the specified room, except the sender
                socket.to(data.ROOM_CODE).emit('receiveMessageEvent', data)
            }
            else {
                // call the file upload function
                fileUpload(data)
                
                // call the schedule deletion function
                deleteScheduler(data)

                // broadcasts the message to all the clients connected to the specified room, except the sender
                socket.to(data.ROOM_CODE).emit('receiveMessageEvent', data)
            }
        })

        // room user details [USER_NAME, USER_ID]
        socket.on('getRoomUsersEvent', (data) => {
            // update the room user details
            const roomUsers = onGetRoomUsersEvent(data, io)
            socket.emit('receiveRoomUsersEvent', roomUsers)
        })

        // start typing event
        socket.on('sendStartTypingEvent', (data) => {
            socket.to(data.ROOM_CODE).emit('getStartTypingEvent', data)
        })

        // stop typing event
        socket.on('sendStopTypingEvent', (data) => {
            socket.to(data.ROOM_CODE).emit('getStopTypingEvent', data)
        })

        // disconnect
        socket.on('disconnect', () => {
            console.log(`A user disconnected with ID: ${socket.id}`);
        })
    })
}

module.exports = connectSocket