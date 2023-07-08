const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EmployeSchema = new Schema(
  {
    Name: {
      type: String,
      minlength: [3, 'Name must be three characters long'],
      trim: true,
      unique: true,
      required: [true, 'Title is required']
    },
    EmployeeId: {
      type: Number,
      required: [true, 'EmployeeId is required']
    },
    Address: {
        type: String,
        minlength: [3, 'Address must be three characters long'],
        required: [true, 'Address is required']
      },
    photo: {
      type: [String],
      required: [true, "property photos is required"]
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

module.exports = mongoose.model('Employe', EmployeSchema)
