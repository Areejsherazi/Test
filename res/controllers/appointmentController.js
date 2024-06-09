const mongoose = require('mongoose');
const Appointment = require('../models/appointment');
const User = require('../models/userInfo');

const bookAppointment = async (req, res) => {
    try {
      const { petowner, doctor, appointmentDate, appointmentTime } = req.body;
  
      // Convert string IDs to ObjectId
      const petownerId = new mongoose.Types.ObjectId(petowner);
      const doctorId = new mongoose.Types.ObjectId(doctor);
  
      // Log the converted ObjectId
      console.log('Converted petownerId:', petownerId);
      console.log('Converted doctorId:', doctorId);
  
      // Find pet owner and doctor
      const petownerData = await User.findById(petownerId);
      const doctorData = await User.findById(doctorId);
  
      // Log the results of the queries
      console.log('Pet owner found:', petownerData);
      console.log('Doctor found:', doctorData);
  
      // Check if pet owner and doctor exist
      if (!petownerData || !doctorData) {
        console.error("Pet owner or doctor not found");
        return res.status(404).json({ message: "Pet owner or doctor not found" });
      }
  
      // Check roles
      if (petownerData.role !== 'petowner' || doctorData.role !== 'doctor') {
        console.error("Invalid roles for pet owner or doctor");
        return res.status(400).json({ message: "Invalid roles for pet owner or doctor" });
      }
  
      // Create new appointment
      const newAppointment = new Appointment({
        petowner: petownerId,
        doctor: doctorId,
        appointmentDate,
        appointmentTime
      });
  
      // Save appointment
      const savedAppointment = await newAppointment.save();
  
      // Update doctor's appointmentRequests
      doctorData.doctorInfo.appointmentRequests.push(savedAppointment._id);
      await doctorData.save();
  
      res.status(201).json({ message: "Appointment request sent successfully", appointment: savedAppointment });
    } catch (error) {
      console.error("Error booking appointment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  const getAppointmentsForDoctor = async (req, res) => {
    try {
      const { doctorId } = req.params;
  
      // Convert string ID to ObjectId
      const doctorObjectId = new mongoose.Types.ObjectId(doctorId);
  
      // Find doctor and populate approvedAppointments
      const doctorData = await User.findById(doctorObjectId).populate('doctorInfo.approvedAppointments');
  
      // Log the results of the query
      console.log('Doctor found:', doctorData);
  
      // Check if doctor exists and has the role of 'doctor'
      if (!doctorData || doctorData.role !== 'doctor') {
        console.error("Doctor not found or invalid role");
        return res.status(404).json({ message: "Doctor not found or invalid role" });
      }
  
      res.status(200).json({ appointments: doctorData.doctorInfo.approvedAppointments });
    } catch (error) {
      console.error("Error fetching appointments for doctor:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  
const respondToAppointment = async (req, res) => {
    let status = '';  // Declare status variable in the outer scope
    try {
        const { appointmentId, status: reqStatus } = req.body;
        status = reqStatus;  // Assign status here

        // Validate status
        if (!['approved', 'rejected'].includes(status)) {
            console.error("Invalid status");
            return res.status(400).json({ message: "Invalid status" });
        }

        // Convert string ID to ObjectId
        const appointmentObjectId = new mongoose.Types.ObjectId(appointmentId);

        // Log the converted ObjectId
        console.log('Converted appointmentId:', appointmentObjectId);

        // Find appointment by ID
        const appointmentData = await Appointment.findById(appointmentObjectId);

        // Log the result of the query
        console.log('Appointment found:', appointmentData);

        // Check if appointment exists
        if (!appointmentData) {
            console.error("Appointment not found");
            return res.status(404).json({ message: "Appointment not found" });
        }

        // Check if appointment is already approved
        if (status === 'approved' && appointmentData.status === 'approved') {
            console.error("Appointment already approved");
            return res.status(400).json({ message: "Appointment already approved" });
        }

        // Find the doctor associated with the appointment
        const doctorData = await User.findById(appointmentData.doctor);

        if (!doctorData || doctorData.role !== 'doctor') {
            console.error("Doctor not found or invalid role");
            return res.status(404).json({ message: "Doctor not found or invalid role" });
        }

        // Update appointment status
        appointmentData.status = status;
        await appointmentData.save();

        if (status === 'approved') {
            // Move appointment from appointmentRequests to approvedAppointments
            doctorData.doctorInfo.appointmentRequests.pull(appointmentObjectId);

            if (!doctorData.doctorInfo.approvedAppointments) {
                doctorData.doctorInfo.approvedAppointments = []; // Initialize array if it doesn't exist
            }

            doctorData.doctorInfo.approvedAppointments.push(appointmentObjectId);
            await doctorData.save();

            const petownerData = await User.findById(appointmentData.petowner);
            console.log("pet owner data",petownerData)
            if (!petownerData || petownerData.role !== 'petowner') {
                console.error("Pet owner not found or invalid role");
                return res.status(404).json({ message: "Pet owner not found or invalid role" });
            }

            if (!petownerData.petownerInfo.approved) {
                petownerData.petownerInfo.approved = []; // Initialize array if it doesn't exist
            }
            petownerData.petownerInfo.personalInfo.approved.push(appointmentObjectId);
            await petownerData.save();

        } 
        else if (status === 'rejected') {
            // Remove appointment from appointmentRequests
            doctorData.doctorInfo.appointmentRequests.slice(appointmentObjectId);
            await doctorData.save();
        }

        


        res.status(200).json({ message: `Appointment ${status} successfully`, appointment: appointmentData });
    } catch (error) {
        console.error(`Error ${status} appointment:`, error);
        res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = {
  bookAppointment,
  getAppointmentsForDoctor,
  respondToAppointment
};


