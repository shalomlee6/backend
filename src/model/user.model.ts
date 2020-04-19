import mongoose from "mongoose";

const bcrypt = require('bcrypt');


var UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName:  {
    type: String,
    required: true
  },  
  email: {
      type: String,
      unique: true,
      required: true
  },
  password: {
      type: String,
      required: true
  }
});

//Creating our model
export const User = mongoose.model("user", UserSchema);


module.exports.getUserById = (id: any, callback: any) => {
    User.findById(id, callback);
}
