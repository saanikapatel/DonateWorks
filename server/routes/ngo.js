import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NgoInfo } from "../models/NgoInfo.js";


const router = express.Router();


router.post("/ngoLogin", async (req, res) => {
    const { email, password } = req.body;
    const user = await NgoInfo.findOne({ email });
  
    if (!user) {
      return res.json({ message: "NGO is not registered." });

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

  export { router as NgoRouter };