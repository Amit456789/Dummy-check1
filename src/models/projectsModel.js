
const mongoose = require("mongoose")
const schema = mongoose.Schema

const projectSchema = new schema({
    type: {
        type: String,
        trim: true,
        // required: [true, "type field is required"]
    },
    buildUpArea: {
        type: String,
        trim: true,
        // required: [true, "Built-up Area field is required"]
    },
    client: {
        type: String,
        trim: true,
        // required: [true, "client field is required"]
    },

    status: {
        type: String,
        trim: true,
        // required: [true, "status field is required"]
    },
    // location: {
    //     city: {
    //         type: String,
    //         // required: [true, "city field is required"],
    //         trim: true
    //     },
    //     country: {
    //         required: true,
    //         type: String,
    //         // required: [true, "country field is required"]
    //     },
    //     // district: {
    //     //     required: true,
    //     //     type: String,
    //     //     // required: [true, "district field is required"]
    //     // }
    // },
    // propertyGallery: {
    //     type: [String],
    //     // required: [true, "property photos is required"]
    // }
})

module.exports = mongoose.model("projectSchema", projectSchema)