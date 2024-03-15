const jwt = require('jsonwebtoken')
const db = require('../db/db.js')
const bcrypt = require('bcrypt')



const createUser = (async(req,res)=>{
try{
  const{username,email,password} = req.body
  const hashedPassword = await bcrypt.hash(password,16)
  const insertion = await db('users').insert({
     username,
     email,
     password:hashedPassword
})  
 if(insertion){
res.json({message:'User Created Successfully'})
        }  
        } catch(error){
            console.error(error)
            res.json({message:'Some intrenal error occurred'})
        }
    })
    
const loginUser = (async(req,res)=>{
    try {
    const{ username,password } = req.body
    if(!username||!password){
    res.json({message:'username or password is invalid'})
        }
    const user = await db('users').where({username}).first()
     if(!user){
   res.json({message:'User not found'})
        }
        const passwordMatch = await bcrypt.compare(password,user.password)
if(user && passwordMatch){
const token  = jwt.sign({userId:user.id,username:user.username},"your_secret_key",{expiresIn:'1h'})
res.json({message:'Login In succesfully',token})
} else{
res.json({message:'Invalid Credentials'})
} 
} catch(error){
        console.error(error)
        res.json({message:'Some Internal Error Occurred'})
    }
})

const logoutUser = (async(req,res)=>{
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




module.exports = {
    createUser,
    loginUser,
    logoutUser
}
