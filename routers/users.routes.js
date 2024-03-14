const { Router } = require('express')
const{ createUser,loginUser,logoutUser } = require('../controllerrs/user.controllers.js')
const{ getMovies,getShows } = require('../controllerrs/get.controllers.js')
const{ bookings } = require('../controllerrs/bookings.controllers.js')


const router = Router()

router.route('/register-user').post(createUser)
router.route('/login-user').post(loginUser)
router.route('/logout-user').post(logoutUser)
router.route('/get-movies').get(getMovies)
router.route('/get-shows').get(getShows)
router.route('bookings').get(bookings)





module.exports = router
