const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");


const registrationSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    gender: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    zipCode: { type: String },
    area_of_Interest:  { type: String },
});

registrationSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "7days" });
    return token;
}

const registerModel = mongoose.model("registration", registrationSchema);


const validate = (data) => {
    console.log(data);
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().required().email().label("Email"),
        password: passwordComplexity().required().label("Password"),
        confirmPassword: passwordComplexity().required().label("Confirm Password"),
        gender: Joi.string().label("Gender"),
        country: Joi.string().label("Country"),
        state: Joi.string().label("State"),
        city: Joi.string().label("City"),
        zipCode: Joi.string().label("ZipCode"),
        area_of_Interest: Joi.string().label("area_of_Interest"),
    });
    return schema.validate(data);

}

module.exports = { registerModel, validate };