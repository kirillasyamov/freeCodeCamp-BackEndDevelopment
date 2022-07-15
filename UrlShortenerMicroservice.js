require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')

// Basic Configuration
const port = process.env.PORT || 3000;
let counter = 0
let shortendUrls = {}

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

function validator(req, res, next) {
    check(req.body.url).isURL()
    console.log(`url`, req.body.url)
    console.log(check(req.body.url).isURL())
    const errors = validationResult(req.body.url)
    console.log(errors.errors)
    if (errors.isEmpty()) {
        next()
    } else {
        res.json({ error: 'invalid url' })
        next()
    }
}



app.post('/api/shorturl', [check('url').isURL()], (req, res) => {
    const url = req.body.url
    const validation = validationResult(req)
    if (validation.errors.length > 0) { return res.status(404).json({ error: 'invalid url' }) }
    console.log(validation.errors)
    console.log(validation.errors.length)
    counter += 1
    shortendUrls[counter] = url
    res.send({ original_url: req.body.url, short_url: counter })
})

app.get('/api/shorturl/:id', (req, res) => {
    const id = req.params.id
    const url = shortendUrls[id]
    res.redirect(url)
})
app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
