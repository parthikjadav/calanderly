const userRoute = require("./user.route")
const holidayRoute = require("./holiday.route")

const express = require("express")
const routes = express.Router()

routes.use("/user", userRoute)
routes.use("/holiday", holidayRoute)

module.exports = routes

