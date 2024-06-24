import mongoose from "mongoose";


const orderDetails = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    address2: {type: String,default: ''},
    region: {type: String, required: true},
    pincode: {type: Number, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    contact: {type: Number, required: true},
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true }
})

const order = new mongoose.Schema({
    user: {
        type: String,
        required: true
      },
    items: [orderDetails]
})

const Orders = mongoose.model('order', order)
export default Orders