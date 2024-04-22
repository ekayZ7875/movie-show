const db = require("../db/db.js");

const getMovies = async (req, res) => {
  try {
    const movies = await db("movie_shows").select(
      "movie_name",
      "movie_poster_URL",
      "show_timings",
      "theatre_name_location",
      "available_seats",
      "ticket_price"
    );
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getMovies,
};
