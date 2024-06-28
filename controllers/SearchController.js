import Restaurant from "../models/restaurant.js";

export const searchRestAndDishes = async (req, res) => {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({ success: false, message: "Search term is required" });
        }

        const words = name.split(/\s+/).map(word => word.trim());
        const pattern = words.map(word => `(${word})`).join('|');
        const regex = new RegExp(`.*(${pattern}).*`, 'i');
        console.log(regex, "regex");

        // Find restaurants with names that match the regex
        const matchingRestaurants = await Restaurant.find({ name: { $regex: regex } });

        // Find all dishes that match the regex in any restaurant
        const allRestaurants = await Restaurant.find({ 'menu.name': { $regex: regex } }).populate('menu');

        // Extract only the matching dishes
        const matchingDishes = [];
        allRestaurants.forEach(restaurant => {
            restaurant.menu.forEach(dish => {
                if (dish.name && regex.test(dish.name)) {
                    matchingDishes.push(dish);
                }
            });
        });

        // Respond with both matching restaurants and matching dishes
        res.status(200).json({
            restaurants: matchingRestaurants,
            dishes: matchingDishes
        });
    } catch (error) {
        console.error('Error fetching restaurants and dishes:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
