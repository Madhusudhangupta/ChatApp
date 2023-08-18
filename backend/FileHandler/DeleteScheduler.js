const path = require('path')
const deleteDirectory = require('./DeleteDirectory')

const getSubfolderPath = (roomCode) => {
    const subFolderPath = path.join(__dirname, `../uploads/${roomCode}`)
    return subFolderPath
}

const deleteScheduler = (data) => {
    const subFolderPath = getSubfolderPath(data.ROOM_CODE)
    const threeHours = 3 * 60 * 60 * 1000
    
    setTimeout(() => {
        deleteDirectory(subFolderPath)
    }, threeHours)
}

module.exports = deleteScheduler