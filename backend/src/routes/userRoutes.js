const router = require("express").Router();
const { registerModel, validate } = require("../models/usersModels");
const bcrypt = require("bcrypt");


router.get(`/`, async (req, res) => {
   await registerModel.find({})
        .then(users => { res.json(users); })
        .catch(err => res.json(err))
});

router.delete(`/deleteUser/:id`, (req, res) => {
    const id = req.params.id;
    console.log("delete id req", id)
    registerModel.findByIdAndDelete({ _id: id })
        .then(users => { res.json(users); console.log(users) })
        .catch(err => res.json(err))
});

router.get(`/getupdate/:id`, (req, res) => {
    console.log("req.body.id for update", req.params.id)
    const id = req.params.id;
    registerModel.findOne({ _id: id })
        .then(user => {
            res.json(user)
        })
        .catch((e) => res.json(e))

});


router.put(`/update/:id`, async (req, res) => {
    const id = req.params.id;
    console.log('updated data', req.params.id)

    try {
        const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await registerModel.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

        // Hash the password
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
    
        // Update user in the database
        const updatedUser = await registerModel.findByIdAndUpdate(
          id,
          { ...req.body, password: hashPassword },
          { new: true }
        );
    
        res.json(updatedUser);
      } catch (error) {
        console.error('Error updating user: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
       })

module.exports = router;