import mongoose from 'mongoose';

// schema for menu
const menuSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageId: { type: String, required: true },
    inStock: { type: Number, required: true },
});

// schema for the SLA 
const slaSchema = new mongoose.Schema({
    deliveryTime: { type: Number, required: true },
    lastMileTravel: { type: Number, required: true },
    serviceability: { type: String, required: true },
    slaString: { type: String, required: true },
    lastMileTravelString: { type: String, required: true },
    iconType: { type: String, required: true }
});

// schema for the availability 
const availabilitySchema = new mongoose.Schema({
    nextCloseTime: { type: Date, required: true },
    opened: { type: Boolean, required: true }
});

// schema for the aggregatedDiscountInfoV3
const aggregatedDiscountInfoV3Schema = new mongoose.Schema({
    header: { type: String, required: true },
    subHeader: { type: String, required: true }
});

// main restaurant schema
const restaurantSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    cloudinaryImageId: { type: String, required: true },
    image: { type: String, required: true },
    locality: { type: String, required: true },
    areaName: { type: String, required: true },
    costForTwo: { type: String, required: true },
    cuisines: { type: [String], required: true },
    avgRating: { type: Number, required: true },
    parentId: { type: String, required: true },
    avgRatingString: { type: String, required: true },
    totalRatingsString: { type: String, required: true },
    sla: { type: slaSchema, required: true },
    availability: { type: availabilitySchema, required: true },
    isOpen: { type: Boolean, required: true },
    type: { type: String, required: true },
    aggregatedDiscountInfoV3: { type: aggregatedDiscountInfoV3Schema, required: true },
    menu : [menuSchema]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
