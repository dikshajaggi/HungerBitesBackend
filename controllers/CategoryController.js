import Category from "../models/category.js"
import Restaurant from "../models/restaurant.js";

export const addcategory = async (req, res) => {
    try {
        const newRestaurant = new Category(req.body);
        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
      }
} 

export const getAllCatgeories = async (req, res) => {
    try {
        const category = await Category.find()
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const fetchRestaurantsByCategory = async (req, res) => {
    try {
        const {id} = req.params
        console.log(id, "category nameee", req.params)
        const words = id.split(/\s+/).map(word => word.trim());
        const pattern = words.map(word => `(${word})`).join('|');
        const regex = new RegExp(`.*(${pattern}).*`, 'i');        
        console.log(regex, "regex");

        const restaurants = await Restaurant.find({ $or: [ { 'menu.name': { $regex: regex } }, { 'menu.category': { $regex: regex } } ] });
        res.status(200).json(restaurants)
    } catch (error) {
        console.error('Error fetching restaurants by category:', error);
        throw error;
    }
};