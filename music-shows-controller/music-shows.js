const express = require('express')
const db = require("../db/db.js")
const sendMail = require('../middlewares/nodemailer.middleware.js')
const nodemailer = require('nodemailer')

const getMusicShows = async (req, res) => {
    try {
        const result = await db('music-shows').select('*');
        res.json(result)
    } catch (error) {
        console.error(error)
        res.json({ messsage: "Some error ocuured while getting shows" })
    }
}

const musicShowsBookings = async (req, res) => {
    try {
        const { show_id, customer_name, email, num_tickets } = req.body;
        const show = await db('music-shows').where({ show_id });
        console.log(show);
        if (!show) {
            res.send({
                status: 404,
                message: 'Show not found'
            })
        }
        const available_seats = await db('music-seats').where({ show_id });
        const numAvailableSeats = availableSeats.available_seats;
        if (!available_seats) {
            res.send({
                status: 404,
                message: 'Seat limit information not found'
            })
        }

        else if (numAvailableSeats < num_tickets) {
            res.send({
                status: 404,
                message: 'Requested number of seats are not available'
            })
        } else {
            const totalPrice = num_tickets * show.price;
            const bookingSuccess = await db.transaction(async (trx) => {
                await trx('music-seats')
                    .where({ show_id })
                    .decrement('available_seats', num_tickets);
                await trx('music-bookings').insert({ show_id, customer_name, email, num_tickets, total_price: totalPrice });
            });
            res.status(201).json({ message: 'Booking successful' });
        }
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
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getMusicShows,
    musicShowsBookings,
}