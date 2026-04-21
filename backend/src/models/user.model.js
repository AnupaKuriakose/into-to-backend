import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 1,
      maxLength: 30,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true, //always get timestamps, when user get craeted
  },
);
//before saving the password hash it
//pre - means before saving, call this async func
userSchema.pre("save", async function () {
  // if password is modified/updated then need to hash it again otherwise no need
  if (!this.isModified("password")) return;
  //here 10 is second param - @param saltOrRounds
  //The salt to be used in encryption. If specified as a number then a salt will be generated with the specified number of rounds and used.
  //here 10 saltorounds to hashpasswords we can increase or decrease it

  this.password = await bcrypt.hash(this.password, 10);
});
//compare passowrds
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
