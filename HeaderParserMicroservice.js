const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000

require('dotenv').config()

app.use(cors({ optionsSuccessStatus: 200 }))

class RequestHeader {
    constructor(req) {
        this.ipaddress = req.headers['x-forwarded-for']
        this.language = req.headers['accept-language']
        this.software = req.headers['user-agent']
    }
}

function handler(req, res) {
    try {
        res.json(new RequestHeader(req))
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

app.get('/api/whoami', handler)

app.listen(PORT, (e) => console.error(e))
