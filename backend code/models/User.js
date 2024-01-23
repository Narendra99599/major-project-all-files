const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: String,
    },
    questionAndAnswer: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pair",
      },
    ],
    additionalDetails : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Profile",
        required : true,
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User',UserSchema)

module.exports.User = User;