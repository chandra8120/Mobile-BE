import { Schema,model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  deviceId: String, // Store device ID..
});
const User=model("user",userSchema)

export default User