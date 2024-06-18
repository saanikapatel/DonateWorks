import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema({
    items: {
        type: [String],
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

})

const DonorModel = mongoose.model("Donor", DonorSchema);
export {DonorModel as Donor};