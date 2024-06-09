const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/book', appointmentController.bookAppointment);
router.get('/doctor/:doctorId', appointmentController.getAppointmentsForDoctor);
router.post('/respond', appointmentController.respondToAppointment);

module.exports = router;

