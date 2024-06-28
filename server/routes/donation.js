import express from 'express';
import bcrypt from 'bcrypt';
import {Donation} from '../models/Donation.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/donate', async (req, res) => {
    try {
        const formData = req.body; // Assuming formData is sent from the client

        // Create a new Donation document based on the schema
        const newDonation = new Donation(formData);

        // Save the new donation to MongoDB
        await newDonation.save();

        res.status(201).json({ message: 'Donation saved successfully', donation: newDonation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving donation' });
    }
});

export {router as DonationRouter};