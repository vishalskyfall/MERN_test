const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserModel = require("./models/user");
const cors = require("cors");

//express 
app.use(express.json());

//using to remove any cors errors
app.use(cors());

//mongoose with mongodb connection DB credentials will be changed in 24 hours
mongoose.connect(
  "mongodb+srv://admin:adminroot@cluster0.ki5cz.mongodb.net/test_crud?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);


//POST method /insert
app.post("/insert", async (req, res) => {
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;
  const email = req.body.email;
  const imgURL = req.body.imgURL;
  const Etype = req.body.Etype;
  const dob = req.body.dob;
  const hobbies = req.body.hobbies;

  const user1 = new UserModel({
    firstName: firstname,
    lastName: lastname,
    email: email,
    imgURL: imgURL,
    Etype: Etype,
    dob: dob,
    hobbies: hobbies,
  });
  try {
    await user1.save();
    res.send("inserted");
  } catch (e) {
    console.log(e);
  }
});


//GET method /read
app.get("/read", async (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }

    res.send(result);
  });
});


//PUT method /update
app.put("/update", async (req, res) => {
  const newName = req.body.newName;
  const id = req.body.id;

  try {
    await UserModel.findById(id, (err, updated) => {
      updated.firstName = newName;
      updated.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

//DELETE method /delete
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await UserModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});


//Server is running on 3001
app.listen(3001, () => {
  console.log("Server is running on Port 3001");
});
