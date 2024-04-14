const db = require("../db/db.js");


const comedy_show = async(req,res) => {




try {
    const comedy_shows = await db("comedy_shows").where({
        comedy_show_id: show_id,
    });

    if (comedy_shows.length === 0) {
        return res.send({
            status: 0,
            message: "Seat limit information not found",
        });
    }

    // Assuming there's only one result, directly access it at index 0
    const comedy_show = comedy_shows[0];

    const numAvailableSeats = comedy_show.available_seats;
    console.log(numAvailableSeats);

    const show_price = comedy_show.ticket_price;
    console.log(show_price);
} catch (error) {
    console.error("Error retrieving comedy shows:", error);
    return res.status(500).send("Error retrieving comedy shows");
}
}