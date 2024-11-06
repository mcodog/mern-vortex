import mongoose, { Schema } from 'mongoose';

const instructorSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        },
    last_name: {
        type: String,
        required: true,
        },
    gender: {
        type: String,
        required: false,
        },
    address: {
        type: String,
        required: false,
        },
    age: {
        type: Number,
        required: false,
        },
    user: [
        {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required:true,
        },
    ],
    image: [
        {
        type: Schema.Types.ObjectId,
        ref: 'AuthorImage',
        required: false
        }
    ],    
    expertise: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Specialization',
            required: false,
        }
    ]
    },

    {
        timestamps: true,
    });

    const Instructor = mongoose.model('Instructor', instructorSchema);
    export default Instructor;

// Instructor
// 	id
// 	first_name
// 	last_name
// 	gender (optional)
// 	address (optional)
// 	age (optional)
// 	user	--> new collection

