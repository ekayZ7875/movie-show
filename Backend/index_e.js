// app for employees




const express = require('express');
const knex = require('knex')
const db = require('./db/db.js')
const bodyparser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




const port = 3000
const app = express()
const secretKey_e = 'secretkey_e'


app.use(express.json())
app.use(bodyparser.json())



function authenticateTokenE(req, res, next) {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, secretKey_e, (error, decoded) => {
      if (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      req.user = decoded;
      next();
    });
  }

app.post('/employee-register',async(req,res)=>{
    try{
        const{ username_e,email_e,password_e } = req.body

        const hashedPassword_e = await bcrypt.hash(password_e,16)

        await db('employees').insert({
            username_e,
            email_e,
            password_e:hashedPassword_e
        })

        res.json({message:'data inserted succeddfull'})
    } catch(error){
        console.log(error)
        res.status(500).json({message:'some internal error occured'})
    }
})

app.post('/employee-login',async(req,res)=>{
    try {

        const{ username_e,password_e } = req.body

if(!username_e||!password_e){
    res.json('please enter username and password')
}

        const user = await db('employees').where({username_e}).first()
        const passwordMatch = await bcrypt.compare(password_e,user.password_e)

        if (passwordMatch && user) {
    
            const token = jwt.sign({userId:user.id,username_e:user,username:user.username_e},secretKey_e,{expiresIn:'1h'})   // generating the token
            res.json({message:"login successfull",token})
            
        } else {
            res.status(401).json({message:'invalid credentials'})
            
        }
        
        
        
    } catch (error) {
        res.status(500).json({message:'internal server error'})
    }
})

app.post('/post-movies',authenticateTokenE,async(req,res)=>{
    try {

        
        const{ title,description,poster_url } = req.body

       const movie = await db('movies').insert({
        title,
        description,
        poster_url

       }).returning('*')

       res.json({ message:'movie inserted successfull', movie: movie[0] });
        
    } catch (error) {

        console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
        
    }
})

app.post('/post-theatres',authenticateTokenE,async(req,res)=>{
    try {

        const{ name,location } = req.body

       const theatre = await db('theaters').insert({
        name,
        location

       }).returning('*')

       res.json({ message:'theatre inserted successfull'});
        
    } catch (error) {

        console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
        
    }

})

app.post('/post-shows',authenticateTokenE,async(req,res)=>{
    try {

        const { movie_id,theater_id,start_time } = req.body

        if (!movie_id || !theater_id || !start_time) {
            return res.status(400).json({ error: 'Invalid request. Please provide movie_id, theater_id, and start_time.' });
            console.log(error);
          }

          const show = await db('shows').insert({
            movie_id,
            theater_id,
            start_time
          }).returning('*');
      
          res.json({ message:'show inserted successfully', show: show[0] });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
})




app.listen(port,()=>{
    console.log('app is listening on port',port);
})
