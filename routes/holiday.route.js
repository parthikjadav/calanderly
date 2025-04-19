const express = require("express")
const holidayController = require("../controller/holiday.controller")
const { validate, holidaySchema } = require("../validation")
const route = express.Router()

// Route to get all holidays for a specific user
route.get("/calender/:userId",holidayController.getAllHolidays)

// Route to add a new holiday
route.post("/add",  validate(holidaySchema),holidayController.addHoliday)

module.exports = route