const express = require('express')
const knex = require('knex')
const db = require('./db/db.js')
const bodyparser = require('body-parser')
const router = require('./routers/users.routes.js')
const bcrypt = require('bcrypt')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 5000
const app = express()
const secretKey = 'secretkey'




app.use(express.json())
app.use(cors()); 
app.use(router)




app.post('/registerUser',async(req,res)=>{
    try {
        const { username, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 16)
        const insertion = await db('test-users').insert({
            username,
            email,
            password: hashedPassword
        })
        if (insertion) {
            res.json({ message: 'User Created Successfully' })
        }
    } catch (error) {
        console.error(error)
        res.json({ message: 'Some internal error occurred' })
    }
})




app.listen(port,()=>{
    console.log('app is listening on port 5000')
})