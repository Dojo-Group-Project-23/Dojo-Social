const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),//REGEX checks for email format
            message: "Please enter a valid email"
        }
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be 3 characters or longer"]
    },
    imgURL: {
        type: String
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }
},{timestamps:true})

UserSchema.virtual("confirmPassword")
    .get( () => this._confirmPassword)
    .set( val => this._confirmPassword = val)

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Please ensure passwords match')
    }
    next()
})

UserSchema.pre('save' , function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash
        next()
    })
    .catch(err => console.log(err)) 
})

module.exports = mongoose.model('User', UserSchema)