import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName:  {
    type: String
  },  
  email: {
      type: String,
      unique: true,
      required: true
  },
  salt: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    unique: true,
    required: true
  }
});

//Creating our model
export const User = mongoose.model("user", UserSchema);


module.exports.getUserById = (id: any, callback: any) => {
    User.findById(id, callback);
}
