const express = require('express')
const dt = require('date-and-time')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000

require('dotenv').config()

app.use(cors({ optionsSuccessStatus: 200 }))

app.use(express.static('public'));
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

class Timestamp {
    constructor(input) {
        this.time = input
    }
    get unix() {
        return this.time.getTime()
    }
    get utc() {
        return this.time.toUTCString()
    }
}


function validator(req, res, next) {
    try {
        let input = req.params.date
        let output, attempt = new Date(input)
        console.log(req.params)
        switch (true) {
            case input == String(''):
                output = new Date()
                break
            case !isNaN(Number(input)):
                output = new Date(Number(input))
                break
            case attempt.toString() == 'Invalid Date':
                console.log(req.params.date)
                res.status(400).json({ error: 'Invalid Date' })
                return
            case attempt:
                output = new Date(input)
                break
            case true:
                output = attempt
                break
        }
        req.date = new Timestamp(output)
        next()
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

function handler(req, res) {
    try {
        res.json({ unix: req.date.unix, utc: req.date.utc })
        console.log("INPUT__:", req.params.date, { unix: req.date.unix, utc: req.date.utc })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

let now = new Timestamp(new Date())

app.get('/api', (req, res) => {
    res.json({ unix: now.unix, utc: now.utc })
})

app.get('/api/:date', validator, handler)

app.listen(PORT, (e) => console.error(e))
