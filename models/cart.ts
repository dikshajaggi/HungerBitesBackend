import mongoose from "mongoose";

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

const CartItemSchema = new mongoose.Schema({
    menu: {
        type: menuSchema,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
  });
  

const CartSchema = new mongoose.Schema({
    user: {
      type: String,
      required: true
    },
    items: [CartItemSchema] 
  });
  
const Cart =  mongoose.model('Cart', CartSchema)
export default Cart;