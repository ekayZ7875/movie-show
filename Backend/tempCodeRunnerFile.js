app.post('/employee-register',async(req,res)=>{
    try{
        const{ username_e,email_e,password_e } = req.body

        const hashedPassword_e = await bcrypt.hash(password_e,16)

        await db("employees").insert({
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
