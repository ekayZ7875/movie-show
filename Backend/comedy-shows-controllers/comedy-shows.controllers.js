const db = require("../db/db.js");
const sendMail = require("../middlewares/nodemailer.middleware.js");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const qrCode = require("qrcode");
const fs = require('fs');
const {
  generateRandomString,
  generateRandomString8,
  generateRandomCharacters,
} = require("../utils/generateRandomStringOrNumber.js");
const { qr } = require("qr-image");



const getComedyShowDetails = async (req, res) => {
  try {
    const details = await db("comedy_shows").select(
      "show_name",
      "show_poster_URL",
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
      console.log(booking_code);
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
      const bookingJsonString = JSON.stringify(bookingData);
      var qr_svg = qr.image(url);
      qr_svg.pipe(fs.createWriteStream("qr_img.png"));

      const bookingSuccess = await db.transaction(async (trx) => {
        await trx("comedy_shows")
          .where({ comedy_show_id: show_id })
          .decrement("available_seats", num_tickets);
        await trx("bookings").insert(bookingData);
      });
      res.status(201).json({ message: "Booking successful", QRCode });
    }

    async function sendMail() {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sjvn2706@gmail.com",
          pass: "qnsqoemikkgsyutn",
        },
      });

      const mailOptions = {
        from:"sjvn2706@gmail.com",
        to: "amarjain991@gmail.com@gmail.com",
        subject: "Booking Confirmation",
        text: `Thank you for booking comedy-shows from Cineverse.Here's your booking code and you can scan this QR ${qr_svg} for further details..`,
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
