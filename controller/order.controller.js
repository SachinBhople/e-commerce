const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")
const User = require("../models/User")
const sendEmail = require("../utils/Email")

exports.placeOrder = asyncHandler(async (req, res) => {
    await Order.create(req.body)
    res.json({ message: "Order Placed Success" })
})

exports.GetUserOrderDetails = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Order.find({ customer: id }).populate("products")
    res.json({ message: "Order Fetch Success", result })
})

exports.cancleOrder = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Order.findByIdAndUpdate(id, req.body)
    const x = await Order.findById(id)
    const result = await User.findById(x.customer)
    // result.email

    await sendEmail({ to: result.email, subject: `order (${id})cancle`, message: `"Your Order With  id ${id} Cancle success"` })
    res.json({ message: "order Cancle success" })

    res.status(200).json({ message: "order Cancle success" })
})