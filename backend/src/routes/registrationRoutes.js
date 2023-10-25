const router = require("express").Router();
const { registerModel, validate } = require("../models/usersModels");
const {fileModel} = require("../models/fileModels");
const bcrypt = require("bcrypt");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../../utils/sendEmail");
const multer = require('multer');


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, '/public/Images'); // Destination folder for uploaded files
	},
	filename: function (req, file, cb) {
	  cb(null, Date.now() + '-' + file.originalname); // Unique filename
	},
  });
  
  const upload = multer({ storage: storage });

router.post("/", async (req, res) => {
	console.log("client data",req.body)
	
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await registerModel.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
			

		 await new registerModel({ ...req.body, password: hashPassword }).save();

	
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


// router.get("/:id/verify/:token/", async (req, res) => {
// 	try {
// 		const user = await registerModel.findOne({ _id: req.params.id });
// 		if (!user) return res.status(400).send({ message: "Invalid link" });

// 		const token = await Token.findOne({
// 			userId: user._id,
// 			token: req.params.token,
// 		});
// 		if (!token) return res.status(400).send({ message: "Invalid link" });

// 		await registerModel.updateOne({ _id: user._id, verified: true });
// 		await token.remove();

// 		res.status(200).send({ message: "Email verified successfully" });
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });
// --------------fileupload---------->

// router.post("/uploads", async (req, res) => {
// 	console.log("client data files",req.files)
// try {
// 	if (!req.file) 
//            return res.send({
//                 status: "failed",
//                 message: "No file uploaded",
//             });
// 			var files = [];
//             var fileKeys = Object.keys(req.files);
//             fileKeys.forEach(function (key) {
//                 files.push(req.files[key]);
//                 console.log("---namefiles", req.files[key]);

//                 const uploadedfiles = new fileModel({
// 					email   : req.body.email,
//                     fileName: req.files[key].name,
//                     fileType: req.files[key].mimetype,
//                     fileSize: req.files[key].size,
//                     fileData: req.files[key].data,
//                 });

//                 uploadedfiles.save();
//                 res.status(201).json({ message: 'File uploaded successfully' });

//             });
	
// } catch (error) {
// 	res.status(500).send({ message: "Internal Server Error" });
// }
// });

module.exports = router;