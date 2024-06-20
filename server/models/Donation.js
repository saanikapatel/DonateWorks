import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  
})

const DonationModel = mongoose.model("Donation", DonationSchema);
export {DonationModel as Donation};