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
    image: [
        {
        type: Schema.Types.ObjectId,
        ref: 'courseImage',
        required: false
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