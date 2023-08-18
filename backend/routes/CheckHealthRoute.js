const express = require('express')

// creating express router handler
const router = express.Router()

router.get('/health', (req, res) => {
    res.send(`Server is healthy!`)
})

module.exports = router