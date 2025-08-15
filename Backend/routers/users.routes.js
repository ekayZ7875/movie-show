const { Router } = require('express')
const{ createUser,loginUser,logoutUser } = require('../controllers/user.controllers.js') 
const{ getMovies} = require('../controllers/get.controllers.js')
const{ movieShowsBookings } = require('../movie-controllers/bookings.controllers.js')
const{ forgetPassword,resetPassword } = require('../controllers/forget-password.controllers.js')
const{getComedyShowDetails,comedyShowsBookings } = require('../comedy-shows-controllers/comedy-shows.controllers.js')
const{ authenticateToken } = require('../middlewares/auth.middleware.js')
const{getMusicShows,getMusicShowsDetails,musicShowsBookings} = require('../music-shows-controller/music-shows.js')




const router = Router();


router.route('/register-user').post(createUser)
router.route('/login-user').post(loginUser)
router.route('/logout-user').post(authenticateToken,logoutUser)
router.route('/get-movies').get(authenticateToken,getMovies)
router.route('/bookings').get(authenticateToken,movieShowsBookings)
router.route('/forget-password').post(forgetPassword)
router.route('/reset-password').post(resetPassword)
router.route('/get-comedy-show-details').get(getComedyShowDetails)
router.route('/book-comedy-shows').post(authenticateToken,comedyShowsBookings)
// router.route('/get-music-shows').get(getMusicShows)
// router.route('/get-music-shows-details').get(getMusicShowsDetails)
router.route('/book-music-shows').post(musicShowsBookings)




module.exports = router
