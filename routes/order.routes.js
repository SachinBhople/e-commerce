const orderRouter = require("express").Router()
const orderController = require("../controller/order.controller")

orderRouter
    .post("/place-order", orderController.placeOrder)
    .get("/place-order/:id", orderController.GetUserOrderDetails)
    .put("/cancle-order/:id", orderController.cancleOrder)

module.exports = orderRouter