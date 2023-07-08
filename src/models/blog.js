
const { object } = require("joi")
const mongoose = require("mongoose")
const schema = mongoose.Schema

const blogSchema = new schema({
    topic:{
        type : String,
        required: [true, "topic field is required"]
    },
    writer : {
        type: String ,
        required: [true, "writer field is required"]
    },
    content : {
        type: String,
        required: [true, "content field is required"]
    },
    propertyGallery: {
        type: [String],
        required: [true, "property photos is required"]
    }
},{timestamps : true});

module.exports = mongoose.model("blog", blogSchema)