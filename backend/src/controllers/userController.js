const usersModels = require('../models/usersModels');

exports.createUserRegistration = async (req, res) => {
    console.log("registration from clientside:", req.body);
        try {
            // Check if the user with the provided email already exists
            // const existingUser = await usersModels.findOne({ email });
            // if (existingUser) {
            //   return res.status(400).json({ message: 'User with this email already exists.' });
            // }
            // Create a new user
            await usersModels.create(req.body)
            // await user.save();        
            res.status(201).json({ message: 'User registered successfully!' , user: user});
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
          }
};

exports.login = async (req, res) => {
  // Handle login logic, validate user, check credentials, etc.
  // If login successful, redirect to dashboard
  // If login fails, render login page with an error message
};

