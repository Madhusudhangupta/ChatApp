const fs = require('fs')
const path = require('path')

// delete a directory and its contents recursively
const deleteDirectory = (directoryPath) => {
    if(fs.existsSync(directoryPath)) {
        const files = fs.readFileSync(directoryPath)
        
        for(const file of files) {
            const filePath = path.join(directoryPath, file)
            if(fs.lstatSync(filePath).isDirectory()) {
                // recursice call fir subdirection
                deleteDirectory(filePath)
            }
            else {
                // delete file
                fs.unlinkSync(filePath)
            }
        }
        // delete the empty directory too
        fs.rmdirSync(directoryPath)
    }
}

module.exports = deleteDirectory