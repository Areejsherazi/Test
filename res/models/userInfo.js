


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    uploadImage: { type: String, required: true },
  },
  { _id: false }
);

const shopkeeperSchema = new Schema(
  {
    shopName: String,
    contact: String,
    address: String,
    typeOfProducts: String,
    shopHours: String,
    paymentInfo: String,
    uploadImage: { type: String, required: true },
    productListing: [productSchema],
  },
  { _id: false }
);


const doctorSchema = new Schema(
  {
    clinicName: String,
    phoneNumber: String,
    clinicAddress: String,
    clinicRegistration: String,
    clinicHours: String,
    paymentInfo: String,
    fullName: String,
    dateOfBirth: Date,
    licenseNumber: String,
    experience: String,
    specialization: String,
    uploadImage: { type: String, required: true },
    appointmentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
    approvedAppointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  },
  { _id: false }
);

const petDetailsSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    petName: String,
    species: String,
    breed: String,
    age: Number,
    gender: String,
    lastVaccinationDate: Date,
    diet: String,
    emergencyContactNumber: String,
  },
  { _id: true }
);

const petownerSchema = new Schema(
  {
    petDetails: [petDetailsSchema],
    personalInfo: {
      fullName: String,
      dateOfBirth: Date,
      contactInformation: String,
      uploadImage: { type: String, required: true },
      approved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }]
    },
  },
  { _id: false }
);

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["doctor", "shopkeeper", "petowner"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  shopkeeperInfo: shopkeeperSchema,
  doctorInfo: doctorSchema,
  petownerInfo: petownerSchema,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
