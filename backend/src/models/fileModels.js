const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const fileSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true
    },
    fileName: {
        type: String,
        required: true,
      },
      fileType: {
        type: String,
        required: true,
      },
      fileSize: {
        type: Number,
        required: true,
      },
      fileData: {
        type: Buffer,
        required: true,
      },
});

// fileSchema.methods.generateAuthToken = function(){
//     const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET,{expiresIn : "7days"});
//     return token;
// }

const fileModel = mongoose.model("files", fileSchema);
module.exports = {fileModel}