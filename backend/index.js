const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const registrationRoutes = require('./src/routes/registrationRoutes');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const connection = require('./db');
const jwt = require("jsonwebtoken");
const { registerModel } = require("./src/models/usersModels");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
require("dotenv").config();
const fileupload = require('express-fileupload')
const { fileModel } = require("./src/models/fileModels");
const multer = require('multer');
// const Grid = require('gridfs-stream');
// Grid.mongo = mongoose.mongo;
// const gfs = Grid(conn.db);

//database connection
connection();
// --------middleware-------->
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json())
app.use(cors())


app.use("/api/users", userRoutes);
app.use("/api/registeration", registrationRoutes);
app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  console.log("hii world")
  res.send('Hello World!');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// -----------------fileupload-----------

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/Images')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname  +"_"+ Date.now() + path.extname(file.originalname))
//   }
// })

// const uploadFile = multer({
//   storage: storage
// })

// app.post('/uploads', uploadFile.single('file'), (req, res) => {
//   console.log(req.file)
//   if (req.files) {
//     console.log(req.files)
//   }
// })

app.use(
  fileupload({
    createParentPath: true,
  }),
);

const storage = multer.memoryStorage(); // Store files in memory as Buffer objects
const upload = multer({ dest: 'upload/', limits: { fileSize: 2000000 } });


app.post(`/uploads/:emailID`, async (req, res) => {
  const emailID = req.params.emailID;
  console.log(emailID, "emailID: ")
  try {
    if (!req.files) {
      res.send({
        status: "failed",
        message: "No file uploaded",
      });
    } else {

      var files = [];
      var fileKeys = Object.keys(req.files);
      fileKeys.forEach(function (key) {
        files.push(req.files[key]);
        console.log("---namefiles", req.files[key]);

        const uploadedfiles = new fileModel({
          email: emailID,
          fileName: req.files[key].name,
          fileType: req.files[key].mimetype,
          fileSize: req.files[key].size,
          fileData: req.files[key].data,
        });

        uploadedfiles.save();
        res.status(201).json({ message: 'File uploaded successfully' });

      });

    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// ----------image retrivve--------------------->

app.get('/profile-pic/:userId', async (req, res) => {
  const email = req.params.userId;
  console.log("imageId", req.params.email)

  try {
    const image = await fileModel.findOne({ email: email });
    console.log("image", image);
    if (!image) {
      return res.status(404).send('Image not found');
    }

    res.set('Content-Type', image.fileType);

    const returnedB64 = Buffer.from(image.fileData).toString('base64')
    res.send(returnedB64);
  } catch (error) {
    console.error('Error occurred while fetching image:', error);
    res.status(500).send('Internal Server Error');
  }
});
////update images-------------------->


app.post(`/updateImageuploads/:emailID`, async (req, res) => {
  const emailID = req.params.emailID;
  console.log(emailID, "emailID: ")
  try {
    if (!req.files) {
      res.send({
        status: "failed",
        message: "No file uploaded",
      });
    } else {

      var files = [];
      var fileKeys = Object.keys(req.files);
      fileKeys.forEach(function (key) {
        files.push(req.files[key]);
        console.log("---namefiles", req.files[key]);

        const uploadedfiles = new fileModel({
          email: emailID,
          fileName: req.files[key].name,
          fileType: req.files[key].mimetype,
          fileSize: req.files[key].size,
          fileData: req.files[key].data,
        });

        uploadedfiles.save();
        res.status(201).json({ message: 'File uploaded successfully' });

      });

    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// -------------------forgot password

app.post(`/forgot-password`, async (req, res) => {
  const email = req.body.email;
  console.log('email for password reset data', email, req.body)
  try {
    const old_user = await registerModel.findOne({ email: email });
    console.log('old user', old_user)
    if (!old_user) {
      return res.status(409).send({ message: "User with given email not registered!" });
    }

    const secret = process.env.JWT_SECRET 
    const token = jwt.sign({ _id: old_user._id, email: old_user.email }, secret, { expiresIn: "120m" });
    console.log("token---", token)

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    });

    var mailOptions = {
      from: process.env.USER,
      to: 'sjofficial204@gmail.com',
      subject: 'Sending Email using Node.js',
      text: `http://localhost:3000/Reset_Password/${old_user._id}/${token}/`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.send({ status: 'success' });
      }
    });
  } catch (error) {

  }
})




app.post(`/Reset_Password/:id/:token`, async (req, res) => {
  const { id, token } = req.params;
  const {password, confirmPassword} = req.body.data;

  console.log(req.params);
  console.log(password);
  console.log( req.body.data.confirmPassword);

  const secret = process.env.JWT_SECRET 
  const salt = await bcrypt.genSalt(Number(process.env.SALT));

  const generateAuthToken = (userId) => {
    const token = jwt.sign({ userId }, secret, { expiresIn: '1h' }); // Token expires in 1 hour
    return token;
  };

  const authToken = generateAuthToken(id);

  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return res.status(409).send({ message: "Invalid token!" });
    } else {

      bcrypt.hash(req.body.data.password, salt)
        .then(hash => {
          registerModel.findByIdAndUpdate(
           {_id: id},
            { confirmPassword:confirmPassword}, {password: hash },
            { new: true }
          )
            .then(u => res.send({ token: authToken }))
            .catch(err => res.send({ Status: "error" }))
        })
        .catch(err => res.send({ Status: " after error" }))
    }

  })

})

// --------------voice fetching------------------

app.get(`/userFetchByVoice/:userName`, async (req, res) => {
  console.log("userName",req.params);
  await registerModel.findOne({firstName:req.params.userName})
       .then(user => { 
        if(user.firstName===req.params.userName){
          res.send(user)
          console.log("inside if",user);
      }
      })
       .catch(err => res.json(err))
});