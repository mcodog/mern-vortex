import mongoose, { Schema } from 'mongoose';

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        },
    description: {
        type: String,
        required: true,
        },
    price: {
        type: Number,
        required: true,
        },
    specialization: [
        {
        type: Schema.Types.ObjectId, 
        ref: 'Specialization', 
        required:true,
        },
    ],
    instructor: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true
        }
    ],    
    images: [
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
    },

    {
        timestamps: true,
    });

    const Course = mongoose.model('Course', courseSchema);
    export default Course;

// Courses
// 	id
// 	title
// 	description
// 	price
// 	specialization --> new collection
// 	author	--> new collection
// 	images	--> new collection