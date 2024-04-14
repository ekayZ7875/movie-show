const QRcode = require('qrcode')

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