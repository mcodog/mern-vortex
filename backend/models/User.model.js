import mongoose, { Schema } from 'mongoose';
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
    membership_type: {
        type: String,
        enum: ['Standard Personal Plan', 'Vortex Plus', 'Vortex Premium', ''],
        required: false,
        default: ''
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
    ],
    cart: [
        {
            course_id: {
                type: Schema.Types.ObjectId,
                required:true,
            }
        }
    ],
    checkout: [
        {
            order: {
                course: [
                    {
                        course_id: {
                            type: Schema.Types.ObjectId,
                            required:true,
                        },
                        status: { 
                            type: String, 
                            enum: ['Ongoing', 'Completed', 'Cancelled', 'Terminated', 'Paused'], 
                            default: 'Ongoing' 
                        },
                    }
                ],
                datePlaced: {
                    type: Date,
                    default: Date.now
                },
                // applied_coupon: {
                //     type: Schema.Types.ObjectId,
                //     ref: 'Promo',
                //     required: false
                // },
                total_cost: {
                    type:Number,
                    required: true
                }
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