import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Donator } from "../models/Donator.js";

const router = express.Router();

router.post("/userSignup", async (req, res) => {
  const { username, email, password, address, contactNumber } = req.body;
  const user = await Donator.findOne({ email });

  if (user) {
    return res.json({ message: "User already exists" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new Donator({
    username,
    email,
    password: hashPassword,
    address,
    contactNumber,
  });

  await newUser.save();

  const token = jwt.sign({ username: newUser.username }, process.env.KEY, {
    expiresIn: "1h",
  });

  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  return res.json({ status: true, message: "Record registered!", token });
});



router.post("/userLogin", async (req, res) => {
  const { email, password } = req.body;
  const user = await Donator.findOne({ email });

  if (!user) {
    return res.json({ message: "User is not registered." });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });

  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  return res.json({ status: true, message: "Login successful!" });
});



const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "No token" });
    }

    const decoded = await jwt.verify(token, process.env.KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.json({ status: false, message: "Unauthorized", error });
  }
};



router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "Authorized" });
});



router.get("/logout", (req, res) => {
  res.clearCookie('token');
  res.json({ status: true, message: "Logged out" });
});

export { router as DonatorRouter };