const mongoose = require('mongoose');
const crypto = require("crypto");

const userSchema  = mongoose.Schema({
name:String,
email:String,
password:String,
avatar: {
    public_id: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
},
posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
resetPasswordToken: String,
resetPasswordExpire: Date,
createdAt: {
    type: Date,
    default: Date.now()
}
})

	// Generating Password Reset Token
    userSchema.methods.getResetPasswordToken = function () {
        // Generating Token
        const resetToken = crypto.randomBytes(20).toString("hex");
      
        // Hashing and adding resetPasswordToken to userSchema
        this.resetPasswordToken = crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex");
      
        this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
      
        return resetToken;
      };
      



const User = mongoose.model("Users",userSchema)
module.exports = User