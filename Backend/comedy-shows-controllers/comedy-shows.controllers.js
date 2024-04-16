const express = require("express");
const db = require("../db/db.js");
const sendMail = require("../middlewares/nodemailer.middleware.js");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const qrCode = require("qrcode");
const {
  generateRandomString,
  generateRandomString8,
  generateRandomCharacters,
} = require("../utils/generateRandomStringOrNumber.js");

const getComedyShows = async (req, res) => {
  try {
    const comedyShows = await db("comedy_shows").select(
      "show_name",
      "show_poster_URL"
    );
    res.json(comedyShows);
  } catch (error) {
    console.error(error);
    res.json({ messsage: "Some error ocuured while getting shows" });
  }
};

const getComedyShowDetails = async (req, res) => {
  try {
    const details = await db("comedy_shows").select(
      "venue",
      "show_timings",
      "available_seats",
      "ticket_price"
    );
    res.json(details);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const comedyShowsBookings = async (req, res) => {
  try {
    const { show_id, user_name, email, show_type, num_tickets } = req.body;
    const show = await db("comedy_shows").where({ comedy_show_id: show_id });
    if (!show) {
      res.send({
        status: 0,
        message: "Show not found",
      });
    }
    const comedy_shows = await db("comedy_shows").where({
      comedy_show_id: show_id,
    });

    console.log(comedy_shows);

    if (comedy_shows.length === 0) {
      return res.send({
        status: 0,
        message: "Seat limit information not found",
      });
    }
    const comedy_show = comedy_shows[0];
    const numAvailableSeats = comedy_show.available_seats;
    console.log(numAvailableSeats);
    const show_price = comedy_show.ticket_price;
    console.log(show_price);

    if (numAvailableSeats < num_tickets) {
      res.send({
        status: 0,
        message: "Requested number of seats are not available",
      });
    } else {
      const booking_code = generateRandomCharacters(12);
      const totalPrice = parseInt(num_tickets * show_price);
      const bookingData = {
        show_id,
        booking_code,
        user_name,
        show_type,
        email,
        total_price: totalPrice,
        num_tickets,
        total_price: totalPrice,
      };
      const bookingJsonString = JSON.stringify(bookingData)
      const QRCode = await qrCode.toDataURL(bookingJsonString)

      const bookingSuccess = await db.transaction(async (trx) => {
        await trx("comedy_shows")
          .where({ comedy_show_id: show_id })
          .decrement("available_seats", num_tickets);
        await trx("bookings").insert(bookingData);
      });
      res.status(201).json({ message: "Booking successful",QRCode});
    }

    async function sendMail() {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "eklavyasinghparihar7875@gmail.com",
          pass: "qnsqoemikkgsyutn",
        },
      });

      const mailOptions = {
        from: "eklavyasinghparihar7875@gmail.com",
        to: "mudittandon202005@gmail.com",
        subject: "Booking Confirmation",
        text: `Thank you for booking comedy-shows from Cineverse.Here's your booking code ${booking_code}.`,
      };
      try {
        const result = await transporter.sendMail(mailOptions);
        console.log("email sent successfully");
      } catch (error) {
        console.log("error", error);
      }
    }
    sendMail();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getComedyShows,
  getComedyShowDetails,
  comedyShowsBookings,
};
