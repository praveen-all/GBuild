const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('./firebase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Multer=require('multer');
// const upload = multer();
const app = express();
const PORT = process.env.PORT || 8000;
const secret = 'your_secret_key';

app.use(cors());
app.use(bodyParser.json());

const AuthRoute = require('./routes/authRoute.js');
const TestRoute=require("./routes/testScoreRoute.js");
const fTrackerRoute = require("./routes/fTrackerRoute.js")
const attendenceRoute=require("./routes/attendenceRoute.js")
const attendRoute =require("./routes/attendRoute.js")
const chatRoute=require('./routes/chatRoute.js')
const messageRoute=require('./routes/messageRoute.js')
const deadlineRoute = require('./routes/deadlineRoute.js')
const resourceRoute=require('./routes/resourceRoute.js')
app.use('/auth', AuthRoute);
app.use('/test',TestRoute);
app.use("/expense",fTrackerRoute);
app.use("/attendence",attendenceRoute);
app.use('/attend',attendRoute)
app.use('/chat',chatRoute)
app.use('/deadline',deadlineRoute)
app.use('/message',messageRoute);
app.use("/resource", resourceRoute);

process.setMaxListeners(15);

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});


// to upload the files into firebase
// app.post("/upload", multer.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).send("No file uploaded.");
//     }
//     //    console.log("hi1");
    
//     const bucket = admin.storage().bucket();
//     // console.log("hi2");
//     const filename = Date.now() + "_" + req.file.originalname;
//     //   console.log("hi3");
//     await bucket.upload(req.file.path, {
//       destination: filename,
//       metadata: {
//         contentType: req.file.mimetype,
//       },
//     });
//     //    console.log("hi4");
//     const file = bucket.file(filename);
//     await file.makePublic();

//     const fileUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

//     // console.log(fileUrl);

//     res.status(200).send({ url: fileUrl });
//   } catch (error) {
//     console.error("Error uploading file:", error.message);
//     res.status(500).send("Error uploading file.");
//   }
// });

app.post("/upload", multer.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const bucket = admin.storage().bucket();
    const filename = Date.now() + "_" + req.file.originalname;
    const file = bucket.file(filename);

    const fileStream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    fileStream.on("error", (err) => {
      console.error("Error uploading file:", err);
      res.status(500).send("Error uploading file.");
    });

    fileStream.on("finish", async () => {
      await file.makePublic(); // Make the file public
      const fileUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
      res.status(200).send({ url: fileUrl }); // Send the file URL in the response
    });

    fileStream.end(req.file.buffer);
  } catch (error) {
    console.error("Error uploading file:", error.message);
    res.status(500).send("Error uploading file.");
  }
});

app.listen(PORT,()=>{
    console.log(`server start listen on port ${PORT}`);
})
