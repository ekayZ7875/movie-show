const nodemailer = ('nodemailer')

module.exports = {
    sendMail:(async(req,res)=>{
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: 'sjvn2706@gmail.com',
                pass: 'qnsqoemikkgsyutn'
            }
        })

    })
}
