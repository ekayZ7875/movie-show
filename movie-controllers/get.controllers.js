const db = require('../db/db.js')



const getMovies = (async(req,res)=>{
    try {
        const theatres = await db('movies').select('*');
        res.json(theatres);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})
const getShows = (async(req,res)=>{
    try {
        const theatres = await db('theaters').select('*');
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