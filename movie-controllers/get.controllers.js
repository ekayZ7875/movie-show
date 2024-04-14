const db = require('../db/db.js')



const getMovies = (async(req,res)=>{
    try {
        const movies = await db('movie_shows').select('movie_name','movie_poster_URL');
        res.json(movies);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})
const getShows = (async(req,res)=>{
    try {
        const theatres = await db('movie_shows').select('theatre_name_location','show_timings','available_seats','ticket_price');
        res.json(theatres);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

module.exports = {
    getMovies,
    getShows
}