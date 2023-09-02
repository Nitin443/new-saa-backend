
import mongoose, { Document, model, Schema } from 'mongoose';

export interface User extends Document {
    _id: mongoose.Types.ObjectId;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
}, {timestamps: true});

export const userModel = model<User>('User', userSchema);
export default userModel;
