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




app.get("/generateQR", async (req, res) => {
  try {
    const text = req.query.text; // Text you want to encode into QR code
    if (!text) {
      return res.status(400).send("Text parameter is missing");
    }

    const qrCode = await QRCode.toDataURL(text, { type: 'text' });
    res.send(`<img src="${qrCode}" alt="QR Code">`);
  } catch (err) {
    console.error("Error generating QR code:", err);
    res.status(500).send("Error generating QR code");
  }
});

app.listen(port,()=>{
    console.log('app is listening on port 5000')
})