const nodemailer = require('nodemailer')
const db = require('../db/db.js')
const bcrypt = require('bcrypt')

const forgetPassword = (async(req,res)=>{
    const { email } = req.body
    const user = await db('users').where({email}).fiirst()
    if(!user){
        res.json({message:'User not found'})
    }
})

// Generating a unique token

const token = Math.floor(100000 + Math.random() * 900000);
const expires_At = new Date(Date.now()+3600000)

await db('forget-password').insert({
    email,
    token,
    expires_at
})

async function sendMail(){
    const transporter  =nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eklavyasinghparihar7875@gmail.com',
            pass: 'qnsqoemikkgsyutn'
        }
    })
    const mailOptions = {
        from: 'eklavyasinghpariharr7875@gmail.com',
        to:'mudittandon202005@gmail.com',
        subject: 'Password Reset Request',
        text: `Your password reset token is: ${token}`,
      }
    try {
        const result = await transporter.sendMail(mailOptions)
        console.log('email sent successfully');
    } catch (error) {
        console.log('error',error)  
    }}
    sendMail()
    res.json({ message: 'Password reset email sent.' });



    const resetPassword = (async(req,res)=>{
        const { username,token,newPassword } = req.body
        const hashedPassword = await bcrypt.hash(newPassword,16)

        const restPassword = await db('forget-password')
        .where({email,token})
        .where('expires_at','>',new Date())
        .first()
    })

    if(!restPassword){
        return res.json({messgae:'invalid or expired token'})
    }

    await db('users')
    .where({email,token})
    .update({password:hashedPassword})

    await db('forget-password')
    .where({email,token})
    .del()

 res.json({message:'Password Reset Successfully'})




 module.exports = {
    forgetPassword,
    resetPassword
 }

