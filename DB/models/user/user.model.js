
import mongoose, { model, Schema } from 'mongoose';


const userSchema = new Schema({
    userName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    active:{
        type:Boolean,
        default:false
    },
    code : String,
}, {
    timestamps: true
});

export const userModel = mongoose.models.User || model("User", userSchema);