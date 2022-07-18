
let d = {
    1: 1451001600000,
    2: "2015-05-05"
}

console.log(String(''))



// function validator(req, res, next) {
//     try {
//         const input = new Date(req.params.date)
//         if (input.toString() == 'Invalid Date') {
//             res.status(400).json({ error: 'Invalid Date' })
//         } else {
//             req.date = new Timestamp(input, req)
//             next()
//         }
//      } catch (e) {
//         console.error(e)
//         res.status(500).json({ error: 'Internal Server Error' })
//     }
// }

// console.log()
















// if (new Date(t) === 'Invalid Date') {
// console.log(new Date(t)) }
// new Date('05 October 2011, GMT')
// console.log(new Date(t)) 


//     switch (true) {
//         case d[i] === 'ms' && d[i].length > 0:
//             d[i] = Number(d[i]) // + 31622400000
//             return new Date(parseInt(td[i]))
//         case d[i].length == 0:
//             return new Date()
//         case this.type === 'date':
//             return dt.parse(d[i], 'YYYY-MM-DD')
//     }


// }
 





// const express = require('express')
// const dt = require('date-and-time')
// const app = express()
// const cors = require('cors')
// const PORT = process.env.PORT || 5000

// require('dotenv').config()

// app.use(cors({ optionsSuccessStatus: 200 }))

// console.log("____", dt.parse(0001, 'YYYY'))

// class Timestamp {
//     constructor(input, req) {
//         this.type = req.type
//         this.time = input
//     }
//     #cast() {
        //  switch (true) {
        //     case this.type === 'ms' && this.time.length > 0:
        //         this.time = Number(this.time) + 31622400000
        //         return new Date(parseInt(this.time))
        //     case this.time.length == 0:
        //         return new Date()
        //     case this.type === 'date':
        //         return dt.parse(this.time, 'YYYY-MM-DD')
        // } 
//       return this.time
//     }
  
//     get unix() {
//         console.log("type", this.type, "cast", this.#cast())
//         return new Date(this.#cast()).getTime()
//     }
//     get utc() {
//         return new Date(this.#cast()).toUTCString()
//     }
// }


// function validator(req, res, next) {
//     try {
//         const input = req.params.date
//         const ms = !isNaN(input)
//         const date = dt.isValid(input, 'YYYY-MM-DD')
//         if (ms | date) {
//             req.type = ms ? 'ms' : 'date'
//             req.date = new Timestamp(input, req)
//             next()
//         } else {
//             res.status(400).json({ error: 'Invalid Date' })
//         }
//     } catch (e) {
//         console.error(e)
//         res.status(500).json({ error: 'Internal Server Error' })
//     }
// }

// function handler(req, res) {
//     try {
//         res.json({ unix: req.date.unix, utc: req.date.utc })
//         console.log("INPUT__:", req.params.date)
//         console.log("!!!!! UNIX", req.date.unix)
//         console.log("!!!!! UTC", req.date.utc)
//     } catch (e) {
//         console.error(e)
//         res.status(500).json({ error: 'Internal Server Error' })
//     }
// }

// app.get('/api/:date', validator, handler)

// app.listen(PORT, (e) => console.error(e))
