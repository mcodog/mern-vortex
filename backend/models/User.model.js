import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false,
        default: 'Learner'
    },
    status: {
        type: String,
        required: false,
        default: 'Active'
    },
    first_name: {
        type: String,
        required: false,
        default: ''
    },
    last_name: {
        type: String,
        required: false,
        default: ''
    },
    birthday: {
        type: String,
        required: false,
        default: ''
    },
    gender: {
        type: String,
        required: false,
        default: ''
    },
    language: {
        type: String,
        required: false,
        default: ''
    },
    country: {
        type: String,
        required: false,
        default: ''
    },
    avatar: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    interests: [
        {
            title: {
                type:String,
                required: true
            }
        }
    ]
},
    {
        timestamps: true,
    });

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

const User = mongoose.model('User', userSchema);
export default User;