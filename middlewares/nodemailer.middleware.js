const nodemailer = ('nodemailer')

module.exports = {
    sendMail:(async(req,res)=>{
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: 'eklavyasinghparihar7875@gmail.com',
                pass: 'qnsqoemikkgsyutn'
            }
        })

    })
}