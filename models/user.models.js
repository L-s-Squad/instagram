const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    email_vertification_sent_time: {
        type: Date,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    phone_otp: {
        type: String,
    },
    phone_otp_time: {
        type: Date,
    },
    phone_verified:{
        type: Boolean,
        default: false,
    },
    email_verified:{
        type: Boolean,
        default: false,
    }
},
{timestamps:true}

)


 mongoose.model('User', userSchema);