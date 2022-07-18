const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('dotenv').config()
const PORT = process.env.PORT || 5000

app.use(cors({ optionsSuccessStatus: 200 }))
app.use(bodyParser.urlencoded({ extended: false }))

mongoose
    .connect(process.env.DB_URI)
    .catch((e) => console.error(e))

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    log: [{
        date: String,
        duration: Number,
        description: String
    }],
    count: Number
})

let User = mongoose.model('User', userSchema)

function tcDecorator(wrapped) {
    return function () {
        try {
            wrapped.apply(this, arguments)
        } catch (e) {
            console.error(e)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}

function createUser(req, res) {
    const username = req.body.username
    const user = new User({ username })
    user.save((e, data) => {
        if (e) {
            res.json({ error: e })
        }
        res.json(data)
    })
}

function getUser(req, res) {
    User.find((e, data) => {
        if (data) {
            res.json(data)
        }
    })
}

function addExersise(req, res) {
    const date = req.body.date ? new Date(req.body.date) : new Date()
    const id = req.params._id

    const exercise = {
        date: date.toDateString(),
        duration: parseInt(req.body.duration),
        description: req.body.description
    }
    User.findByIdAndUpdate(id, {
        $push: { log: { ...exercise } },
        $inc: { count: 1 }
    }, { new: true }, (e, data) => {
        if (data) {
            const user = {
                username: data.username,
                ...exercise,
                _id: id
            }
            res.json(user)
        }
    })
}

function getUserLogs(req, res) {
    User.findById(req.params._id, (e, data) => {
        const { from, to, limit } = req.query

        if (req.url.includes('?')) {
            let filteredLogs = data.log
            const d = Date.parse

            if (from) filteredLogs = filteredLogs.filter(el => d(el.date) >= d(from))
            if (to) filteredLogs = filteredLogs.filter(el => d(el.date) <= d(to))
            for (let i in filteredLogs) { console.log(i, filteredLogs[i]) }
            if (limit) filteredLogs = filteredLogs.slice(0, Number(limit) - 1)

            data.log = filteredLogs
        }
        res.json(data)
    }
    )
}

app.route('/api/users')
    .post(tcDecorator(createUser))
    .get(tcDecorator(getUser))

app.post('/api/users/:_id/exercises', tcDecorator(addExersise))

app.get('/api/users/:_id/logs', tcDecorator(getUserLogs))

app.listen(PORT, (e) => console.error(e))