const express = require('express')
const cors = require('cors')
const multer = require('multer')
const PORT = process.env.PORT || 5000

const app = express()
const upload = multer({ dest: 'public/' })

require('dotenv').config()

app.use(cors({ optionsSuccessStatus: 200 }))


app.use('/public', express.static(process.cwd() + '/public'))

function handler(req, res) {
    try {
        res.json({
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

app.post('/api/fileanalyse', upload.single('upfile'), handler)

app.listen(PORT, (e) => console.error(e))
