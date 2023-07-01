const mongoose = require('mongoose')

const Schema = mongoose.Schema

const HelpSchema = new Schema(
  {
    Worktype: {
        type: String,
        enum: ['Architecture', 'Interiors'],
        required: [true, 'Type is required']
      },
    Worktype1: {
      type: String,
      required: [true, 'Work Type is required'],
      unique: true
    },
    Bhk: {
      type: Number,
      required: [true, 'Number of BHK is required']
    },
    Budget: {
        type: Number,
        required: [true, 'Budget of BHK is required']
    },
    Area: {
        type: Number,
        required: [true, 'Built Up Area is required']
      },
    Location:{
        type: String,
        required:[true,"Location is required"]
    },
    Name: {
        type: String,
        required: [true, 'Name is required']
      },
    Phone: {
        type: Number,
        required: [true, 'Phone Number is required']
      },
    email: {
        type: String,
        required: [true, 'Email is required']
      },    
  },
  { timestamps: true }
)

module.exports = mongoose.model('Help', HelpSchema)
