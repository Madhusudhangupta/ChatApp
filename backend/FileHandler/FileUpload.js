const fs = require('fs')
const path = require('path')

// handle file upload and save with a unique name
const fileUpload = (data) => {
    const fileBuffer = data.CONTENT

    // create a unique filename based on current time and the original filename
    const uniqueFileName = `${Date.now()}-${data.CONTENT_NAME}`
    const uploadsDir = path.join(__dirname, `../uploads/${data.ROOM_CODE}`)

    try {
        fs.mkdirSync(uploadsDir, { recursive: true })
    } catch (error) {
        console.log(`Error creating directory: `, error)
        return
    }

    const filePath = path.join(uploadsDir, uniqueFileName)
    fs.writeFileSync(filePath, fileBuffer)

    // append the unique filename to the data object
    data.UNIQUE_NAME = uniqueFileName
}

module.exports = fileUpload