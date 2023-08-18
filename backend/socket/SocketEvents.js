const onJoinRoomEvent = (data, socket, io) => {
    if(data.IS_NEW_ROOM) {
        // user joins in new room
        socket.join(data.ROOM_CODE)
        //save the USER_NAME in socket.data
        socket.data.USER_NAME = data.USER_NAME
        //save the USER_ID in socket.data
        socket.data.USER_ID = data.USER_ID

        socket.emit('toastEvent', `Welcome to the ChatApp ${data.USER_NAME}`)
    }
    else {
        // user join in existing room
        // check if room code exists
        const roomExists = io.of('/').adapter.rooms && io.of('/').adapter.rooms.has(data.ROOM_CODE)

        if(roomExists) {
            socket.join(data.ROOM_CODE)
            // save the user name in socket.data
            socket.data.USER_NAME = data.USER_NAME
            // save the user ID in socket.data
            socket.data.USER_ID = data.USER_ID

            socket.to(data.ROOM_CODE).emit('toastEvent',`${data.USER_NAME} has joined the room`)

            // update the room user details
            let roomUsers = onGetRoomUsersEvent(data, io)
            socket.to(data.ROOM_CODE).emit(`receiveRoomUsersEvent`, roomUsers)
            socket.emit('toastEvent', `Welcome to the ChatApp ${data.USER_NAME}!`)

            // emit toast event when user leaves the room
            socket.on('disconnecting', () => {
                const disconnectedUser = roomUsers.find((user) => user[1] === socket.data.USER_ID)
                if(disconnectedUser) {
                    socket.to(data.ROOM_CODE).emit('toastEvent', `${socket.data.USER_NAME} has left the room`)
                }

                // update the room user details and remove the disconnected user
                roomUsers = onGetRoomUsersEvent(data, io, socket.data.USER_ID)
                socket.to(data.ROOM_CODE).emit('receiveRoomUsersEvent', roomUsers)
            })
        }
        else {
            socket.emit('errorEvent', `Landed NOWHERE! No ${data.ROOM_CODE} found!!!`)
        }
    }
}

const onGetRoomUsersEvent = (data, io, excludeUserId = null) => {
    const room = io.sockets.adapter.rooms.get(data.ROOM_CODE)
    if(room) {
        const users = []
        room.forEach((socketId) => {
            const socket = io.sockets.get(socketId)
            if(
                socket &&
                socket.data &&
                socket.data.USER_NAME &&
                socket.data.USER_ID &&
                socket.data.USER_ID !== excludeUserId
            ) {
                users.push([socket.data.USER_NAME, socket.data.USER_ID])
            }
        });
        return users
    }
    return []
}

module.exports = { onJoinRoomEvent, onGetRoomUsersEvent }