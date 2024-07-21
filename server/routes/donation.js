import express from 'express';
import {Donation} from '../models/Donation.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
 
const router = express.Router();

const app = express();
 
// Middleware to parse cookies
app.use(cookieParser());
 
router.post('/donate', async (req, res) => {
    try {
         
        const { clothingItems, season, quantity, condition, specialInstructions, preferredDay } = req.body;
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.KEY);
        const email = decoded.email;
  
        const newDonation = new Donation({
            email,
            clothingItems,
            season,
            quantity,
            condition,
            specialInstructions,
            preferredDay
          });

        await newDonation.save();

        res.status(201).json({ message: 'Donation saved successfully', donation: newDonation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving donation' });
    }
});


router.get('/user-donations', async (req, res) => {
    try {
      // const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }
  
      const decoded = jwt.verify(token, process.env.KEY);
      const email = decoded.email;
  
      const donations = await Donation.find({ email });
      res.json(donations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching donations' });
    }
  });


  router.delete('/delete-donation/:id', async (req, res) => {
    try {
      // const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      } 
  
      const decoded = jwt.verify(token, process.env.KEY);
      const email = decoded.email;
  
      const donation = await Donation.findOneAndDelete({ _id: req.params.id, email });
  
      if (!donation) {
        return res.status(404).json({ message: 'Donation not found' });
      }
  
      res.status(200).json({ message: 'Donation deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting donation' });
    }
  });

export {router as DonationRouter};