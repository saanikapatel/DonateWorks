import mongoose from "mongoose";

const ChildrenAgeGroupsSchema = new mongoose.Schema({
    '3-5': Boolean,
    '6-8': Boolean,
    '9-12': Boolean,
    '13-15': Boolean,
    '16-18': Boolean
});

const DonationSchema = new mongoose.Schema({
    clothingItems: [
        {
            type: { type: String, required: true },
            selected: { type: Boolean, required: true },
            childrenAgeGroups: ChildrenAgeGroupsSchema,
            description: String
        }
    ],
    season: {
        summer: Boolean,
        winter: Boolean,
        allSeason: Boolean
    },
    quantity: { type: Number, required: true },
    condition: {
        newCondition: Boolean,
        used: Boolean,
        needsMinorRepairs: Boolean
    },
    specialInstructions: String,
    preferredDay: String
})

const DonationModel = mongoose.model("Donation", DonationSchema);
export {DonationModel as Donation};