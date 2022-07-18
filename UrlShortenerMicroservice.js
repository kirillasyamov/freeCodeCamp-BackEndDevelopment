const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

require('dotenv').config()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(`${process.cwd()}/public`))

let counter = 0
let shortendUrls = {}

function getUrl(req, res) {
    const id = req.params.id
    const url = shortendUrls[id]
    res.redirect(url)
}

function validator(req, res, next) {
    let url = new URL(req.body.url)

    if (url.protocol === 'http:' || url.protocol === 'https:') {
        next()
    } else {
        res.status(404).json({ error: 'invalid url' })
    }
}

function shortenUrl(req, res) {
    const url = req.body.url
    counter += 1
    shortendUrls[counter] = url
    res.send({ original_url: req.body.url, short_url: counter })
}

app.post('/api/shorturl', validator, shortenUrl)

app.get('/api/shorturl/:id', getUrl)

app.listen(PORT, (e) => console.error(e))