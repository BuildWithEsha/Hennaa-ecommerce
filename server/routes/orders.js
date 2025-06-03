import express from 'express';
import Order from '../models/Orders.js';
const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { orderNo, cartItems, form } = req.body;

    if (!orderNo || !cartItems || !form) {
      return res.status(400).json({ message: "Missing order data" });
    }

    const newOrder = new Order({
      orderNo,
      cartItems,
      form,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order saved", orderId: newOrder._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); 
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { delivered } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { delivered },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ message: "Failed to delete order", error });
  }
});


export default router; 
