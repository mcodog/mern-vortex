import mongoose from 'mongoose';

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
        required: true,
        },
    status: {
        type: String,
        required: true,
        },
    },
    {
        timestamps: true,
    });

    const User = mongoose.model('User', userSchema);
    export default User;

// user
// 	id
// 	name
// 	email
// 	password
// 	role
// 	status