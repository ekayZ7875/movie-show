const express = require('express')
const db = require('../db/db.js')

const getComedyShows = (async(req,res)=>{
    try{
        const comedyShows = await db('comedy-shows-2').select('*')
        res.json(comedyShows)
    }catch(error){
        console.error(error)
        res.json({messsage:"Some error ocuured while getting shows"})
    }
})
const comedyShowsBookings = (async(req,res)=>{
    try{
        const{ show_id,customer_name,email,num_tickets } = req.body
        const show = await db('comedy-shows-2').where({id:show_id}).first()
        if(!show){
            res.send({
                status:0,
                message:'Show not found'
            })
        }
        const availableSeats = await db('available_seats').where({show_id}).first()
        if(!availableSeats){
            res.send({
                status:0,
                message:'Seat limit information not found'
            })
        }
        const numAvailableSeats = availableSeats.num_available_seats
        if(numAvailableSeats < num_tickets){
            res.send({
                status:0,
                message:'Requested number of seats are not available'
            })
        }else {
        const totalPrice = num_tickets*show.price

        await db.transaction(async (trx) => {
            await trx('available_seats')
              .where({ show_id })
              .decrement('num_available_seats', num_tickets);
              await trx('bookings-comedy_1').insert({ show_id, customer_name, email, num_tickets, total_price: totalPrice });
            });
            res.status(201).json({ message: 'Booking successful' });
  } }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


module.exports = {
    getComedyShows,
    comedyShowsBookings
}