const express = require('express')
const dt = require('date-and-time')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000

require('dotenv').config()

app.use(cors({ optionsSuccessStatus: 200 }))

class Timestamp {
    constuctor(input) {
        this.type = req.type
        this.time = input
    }
    #cast() {
        switch (true) {
            case this.type === 'ms' && this.time.length:
                return new Date(parseInt(this.time))
            case this.time.length == 0:
                return new Date()
            case this.type === 'date':
                return dt.parse(this.time, 'YYYY-MM-DD')
        }
    }
    getUnix() {
        return this.#cast().getTime()
    }
    getUtc() {
        return this.#cast().toUTCString()
    }
}

// можно просто гет отдельно тогда не нужно будет как функции вызывать

function validator(req, res, next) {
    try {
        const input = req.params.date
        const ms = !isNaN(input)
        const date = dt.isValid(input, 'YYYY-MM-DD')
        if (ms | date) {
            req.type = ms ? 'ms' : 'date'
            req.date = new Timestamp(input)
            next()
        } else {
            res.status(400).json({ error: 'Invalid Date' })
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

function handler(req, res) {
    try {
        res.json({ unix: req.date.getUnix(), utc: req.date.getUtc() })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

app.get('/api/:date', validator, handler)

app.listen(PORT, (e) => console.error(e))
