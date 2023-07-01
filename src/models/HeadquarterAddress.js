const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AddressSchema = new Schema(
  {
    OfficeName: {
      type: String,
      minlength: [3, 'Office Name be must three characters long'],
      required: [true, 'Office name is required'],
      unique: true
    },
    Address1: {
      type: String,
      required: [true]
    },
    Address2: {
        type: String,
        required: [true]
      },
    City: {
        type: String,
        required: [true]
      },
    State: {
        type: String,
        required: [true]
      },
    Pincode: {
        type: Number,
        required: [true]
      },
    Email: {
        type: String,
        required: [true]
      }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Address', AddressSchema)

