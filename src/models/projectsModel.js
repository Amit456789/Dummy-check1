
const { object } = require("joi")
const mongoose = require("mongoose")
const schema = mongoose.Schema

const projectSchema = new schema({
    type: {
        type: [String],
        required: [true, "type field is required"]
    },
    buildUpArea: {
        type: String,
        trim: true,
        required: [true, "Built-up Area field is required"]
    },
    client: {
        type: String,
        trim: true,
        required: [true, "client field is required"]
    },

    status: {
        type: String,
        trim: true,
        required: [true, "status field is required"]
    },
    location: {
        city: {
            trim: true,
            type: String,
            required: [true, "City field is required"]
        },
        state: {
            trim: true,
            type: String,
            required: [true, "state field is required"]
        },
        country: {
            trim: true,
            type: String,
            required: [true, "country field is required"]
        }
    },
    propertyGallery: {
        type: [String],
        required: [true, "property photos is required"]
    },
    description: {
        type: String,
        required: [true, "description field is required"]
    },
    concept: {
        type: String,
        required: [true, "concept field is required"]
    }
})

module.exports = mongoose.model("projectSchema", projectSchema)