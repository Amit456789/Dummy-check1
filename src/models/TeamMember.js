const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TeamSchema = new Schema(
  {
    title: {
      type: String,
      minlength: [3, 'Title must be three characters long'],
      trim: true,
       required: [false, 'Title is required']
    },
    description: {
      type: String,
      minlength: [3, 'Description must be three characters long'],
      required: [false, 'Description is required']
    },
    photo: {
      type: String,
      default: 'no-photo.jpg'
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true }
)

TeamSchema.virtual('questions', {
  ref: 'Question',
  localField: '_id',
  foreignField: 'category',
  justOne: false,
  count: true
})

// Cascade delete questions & scores when a team is deleted
TeamSchema.pre('remove', async function(next) {
  // console.log(`Question being removed from category ${this._id}`)
  await this.model('Question').deleteMany({ category: this._id })
  // console.log(`Score being removed from category ${this._id}`)
  await this.model('Score').deleteMany({ category: this._id })
  next()
})

module.exports = mongoose.model('Team', TeamSchema)
