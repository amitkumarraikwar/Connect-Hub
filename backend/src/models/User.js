import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 13,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);