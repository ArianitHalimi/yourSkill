const mongoose = require('mongoose')

const ideas = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        default:'easy'
    },
    type:{
        type:String,
        default:'featured'
    },
    users_completed:{
        type:Array,
        default: []
    },
    course_satisfaction:{
        type:Number,
        default:0
    },
    hyperlink:{
        type:String,
        required: true
    }
})

const idea = mongoose.model('ideas',ideas)

module.exports = idea