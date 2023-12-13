const express = require('express')
const router = express.Router();

const flightController = require('../controllers/flight')
const loginController = require('../controllers/login')
const routeController = require('../controllers/route');
const bookingController= require('../controllers/booking.js');
const registerController=require('../controllers/register');
const isAuth=require('../middleware/is-user')

router.post('/flight',flightController.createFlight)
router.get('/flight',flightController.getAllFlight)
// router.post('/login',loginController.loginUser)
router.put('/flight/:_id', flightController.updateFlight);
router.delete('/flight/:_id', flightController.deleteFlight);


router.get('/routes',routeController.getAllroutes);
router.post('/routes',routeController.addroutes);
router.get('/routes/:id',routeController.getrouteById);
router.put('/routes/:id',routeController.updateroute);
router.delete('/routes/:id',routeController.deleteroute);
router.get('/routes/:source/:destination',routeController.searchflight);


router.get('/searchflights',bookingController.getFlightDetails);
router.post('/customer',bookingController.createCustomer);
router.get('/searchCustomers', bookingController.getCustomerDetails);
router.delete('/customer/:id',bookingController.deleteCustomerDetail);
router.post('/register',registerController.register);
router.post('/login',registerController.login);
router.get('/auth-user',isAuth,registerController.getAuthUser)
module.exports = router;