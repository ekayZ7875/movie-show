const express = require('express')
const knex = require('knex')
const db = require('./db/db.js')
const bodyparser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const port = 5000
const app = express()
const secretKey = 'secretkey'
const seatPrice = 250
// const saltRounds = 10

app.use(express.json())
app.use(bodyparser.json())


//route for registering the user
app.post('/user-register',async(req,res)=>{

    try{
        const { username,email,password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);

        await db('users').insert({
            username,
            email,
            password: hashedPassword
        })

        res.json({message:'data inserted successfull'})
    } catch(error){
        
        res.status(500).json({message:'some internal error occured'})
        console.log(error)
    }
})

//route for logging in the user
app.post('/user-login',async(req,res)=>{
    try {
        const{ username,password } = req.body
if(!username||!password){
    res.json('please enter username and password')
        const user = await db('users').where({username}).first()
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch && user) {    
            const token = jwt.sign({userId:user.id,username:user,username:user.username},secretKey,{expiresIn:'1h'})   // generating the token
            res.json({message:"login successfull",token})   
        } else {
            res.status(401).json({message:'invalid credentials'})            
        }  } 
}catch (error) {
        res.status(500).json({message:'internal server error'})
    }
})

//middleware for authentication
function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      next();
    });
  }

//route for getting the movies through authentication
app.get('/movies',authenticateToken,async(req,res)=>{

    try {
        const movies = await db('movies').select('*');
        res.json(movies);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

})

//route for getting available theatres through authentication
app.get('/theatres',authenticateToken,async(req,res)=>{
    try {
        const theatres = await db('theaters').select('*');
        res.json(theatres);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

//route for getting available shows through authentication
app.get('/shows',authenticateToken,async(req,res)=>{

    try {
        const shows = await db('shows').select('*');
        res.json(shows);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

})

//route for posting bookings through authentication
app.post('/bookings', async (req, res) => {
    try {

    const { user_id, show_id, seats_booked } = req.body

    if (!user_id || !show_id || !seats_booked) {
        return res.status(400).json({ error: 'Invalid request. Please provide user_id, show_id, and seats_booked.' });
      }
    const totalAmount = seats_booked * seatPrice;
    const show = await db('shows').where({ id: show_id }).first();
    if (!show) {
        return res.status(404).json({ error: 'Show not found.' });
      }
    const bookedSeatsCount = await db('bookings')
        .where({ show_id })
        .sum('seats_booked')
        .first();
  
    const availableSeats = show.total_seats - (bookedSeatsCount.sum || 0);
    const theaterSeatLimit = 5000;
    if (seats_booked > availableSeats || (bookedSeatsCount.sum || 0) > theaterSeatLimit) {
        return res.status(400).json({ error: `Not enough available seats or exceeding the theater's seat limit of ${theaterSeatLimit} seats.` });
      }
    const booking = await db('bookings').insert({
              user_id,
              show_id,
              seats_booked,
            }).returning('*')

   if(booking){
    res.json({ booking: booking[0],totalAmount })
   }
const bookingTickets = await db('tickets_1').insert({
    user_id,
    show_id,
    ticket_price:totalAmount,
    seats_booked
})
async function sendMail(){
    const transporter  =nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eklavyasinghparihar7875@gmail.com',
            pass: 'qnsqoemikkgsyutn'
        }
    })
    
const mailOptions ={
        from:'eklavyasinghparihar7875@gmail.com',
        to: 'mudittandon202005@gmail.com',
        subject: 'Booking Confirmation',
        text: 'Your Booking Is Confirmed!'
    }
    
    try {
        const result = await transporter.sendMail(mailOptions)
        console.log('email sent successfully');
    } catch (error) {
        console.log('error',error)   
    }}
    sendMail()
    } catch(error){
        res.json('error while booking show please try again')
    }
})
app.get('/get-tickets',async(req,res)=>{

    const { user_id } = req.body

    const tickets = await db('tickets_1').where({user_id})
        res.status(200).json({ tickets })
})

app.post('/user-logout',authenticateToken,async(req,res)=>{
    const token = req.headers.authorization

    if(!token){
        res.json('invalid authoriztion')
    } 

    jwt.verify(token,secretKey,(error,decoded)=>{

        if(error){
            console.error(error)
            res.status(404).json({message:'invalid token'})
        }
    
        res.json({message:'logout sucessfull'})
})  
    })
    


app.listen(port,()=>{
    console.log('app is listening on port',port)
})