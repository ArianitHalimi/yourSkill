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
    users_completed:{
        type:Array,
        default: []
    },
    course_satisfaction:{
        type:Number,
        default:0
    }
})

const idea = mongoose.model('ideas',ideas)

module.exports = idea