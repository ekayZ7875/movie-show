const express = require('express')
const knex = require('knex')
const db = require('./db/db.js')
const bodyparser = require('body-parser')
const router = require('./routers/users.routes.js')
require('dotenv').config()

const port = process.env.PORT || 5000
const app = express()
const secretKey = 'secretkey'




app.use(express.json())
app.use(router)




// app.get("/generateQR", async (req, res) => {
//   try {
//     const text = req.query.text; // Text you want to encode into QR code
//     if (!text) {
//       return res.status(400).send("Text parameter is missing");
//     }

//     const qrCode = await QRCode.toDataURL(text, { type: 'text' });
//     res.send(`<img src="${qrCode}" alt="QR Code">`);
//   } catch (err) {
//     console.error("Error generating QR code:", err);
//     res.status(500).send("Error generating QR code");
//   }
// });

// app.post("/cc",async(req,res)=>{
//   try {
//     const{show_id} = req.body
//     const comedy_shows = await db("comedy_shows").where({
//         comedy_show_id: show_id,
//     });

//     if (comedy_shows.length === 0) {
//         return res.send({
//             status: 0,
//             message: "Seat limit information not found",
//         });
//     }

//     // Assuming there's only one result, directly access it at index 0
//     const comedy_show = comedy_shows[0];

//     const numAvailableSeats = comedy_show.available_seats;
//     console.log(numAvailableSeats);

//     const show_price = comedy_show.ticket_price;
//     console.log(show_price);
// } catch (error) {
//     console.error("Error retrieving comedy shows:", error);
//     return res.status(500).send("Error retrieving comedy shows");
// }
// })


app.listen(port,()=>{
    console.log('app is listening on port 5000')
})