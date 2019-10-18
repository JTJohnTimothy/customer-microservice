import mongoose from 'mongoose'

const Schema = mongoose.Schema

const customerSchema = new Schema({
  customerId: { type: String },
  firstName: { type: String }, // sort search
  middleName: { type: String }, // sort search
  lastName: { type: String }, // sort search
  birthDate: { type: Date },
  occupation: { type: String },
  email: { type: String }, // sort search
  gender: { type: String },
  mobileNo: { type: String },
  address: { type: String },
  maritalStatus: { type: String }
}, { timestamps: true })

export default mongoose.model('customer', customerSchema)
