const nodemailer = require('nodemailer')
const db = require('../db/db.js')
const seatPrice = 250.00;


const bookings = (async (req, res) => {
    try {
        const { user_id, show_id, seats_booked } = req.body

        if (!user_id || !show_id || !seats_booked) {
            return res.status(400).json({ error: 'Invalid request. Please provide user_id, show_id, and seats_booked.' });
        }
        const totalAmount = seats_booked * seatPrice;
        const show = await db('movie_shows').where({ movie_id: show_id });
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

        if (booking) {
            res.json({ booking: booking[0], totalAmount })
        }
        const bookingTickets = await db('tickets_1').insert({
            user_id,
            show_id,
            ticket_price: totalAmount,
            seats_booked
        })
        async function sendMail() {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'eklavyasinghparihar7875@gmail.com',
                    pass: 'qnsqoemikkgsyutn'
                }
            })

            const mailOptions = {
                from: 'eklavyasinghparihar7875@gmail.com',
                to: 'mudittandon202005@gmail.com',
                subject: 'Booking Confirmation',
                text: 'Your Booking Is Confirmed!'
            }

            try {
                const result = await transporter.sendMail(mailOptions)
                console.log('email sent successfully');
            } catch (error) {
                console.log('error', error)
            }
        }
        sendMail()
    } catch (error) {
        res.json('error while booking show please try again')
    }
})



module.exports = {
    bookings
}