import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNo: { type: String, required: true, unique: true },
  cartItems: [
    {
      productId: String,
      title: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  form: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    country: String,
    city: String,
    address: String,
    houseNo: String,
    postalCode: String,
    shippingMethod: String,
    paymentMethod: String,
  },
  delivered: { type: Boolean, default: false }, // ✅ Add this
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
