const express = require("express");
const router = express.Router();
const User = require("../models/Users");

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error("Error fetching users");
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//get specific user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw Error("Error fetching users");
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//post users
router.post("/", async (req, res) => {
  const newUser = new User(req.body);

  try {
    const user = await newUser.save();
    if (!user) throw Error("Error creating user");
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//delete specific user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw Error("No user found");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//update specific user
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) throw Error("User not updated");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
