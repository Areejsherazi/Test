const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  petowner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  appointmentDate: { type: Date, required: true },
  appointmentTime: { type: String, required: true }, // Example: "14:00"
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
