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

// user
// 	id
// 	name
// 	email
// 	password
// 	role
// 	status