const Holiday = require("../model/holiday.model");
const { days, daysOfMonth } = require("../constants");
const { getTimedDate, getLocalDateString } = require("../validation");

const holidayController = {
    getAllHolidays: async (req, res) => {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }

            const holidays = await Holiday.find({ userId });

            if (holidays.length === 0) {
                return res.status(404).json({ message: "No holidays found for this user" });
            }

            let monthsSet = new Set();
            let result = [];
            holidays.forEach((holiday) => {
                monthsSet.add(holiday.month);
            })
            monthsSet.forEach((month) => {
                let daysInMonth = daysOfMonth[month] || 0;
                for (let i = 1; i <= daysInMonth; i++) {

                    let year = holidays.find(holiday => holiday.month === month).year;
                    let dayIndex = new Date(`${year}-${month}-${i}`).getDay();
                    let day = days[dayIndex];
                    let week = Math.ceil(i / 7);
                    let currentDate = getLocalDateString(`${year}-${month}-${i}`);
                   
                    if (holidays.find(holiday => new Date(holiday.date).getDate() === i)) {
                        result.push({
                            day,
                            week,
                            date: currentDate,
                            message: holidays.find(holiday => new Date(holiday.date).getDate() === i).message,
                            month,
                            isHoliday: true,
                            year,
                        })
                        continue;
                    }

                    result.push({
                        day,
                        week,
                        date: currentDate,
                        message: "",
                        isHoliday: false,
                        month,
                        year,
                    })
                }
            })

            res.status(200).json({ message: "Holidays fetched successfully", result });
        } catch (error) {
            console.log(error);

            res.status(500).json({ message: "Error fetching holidays" + error.message });
        }
    },
    addHoliday: async (req, res) => {
        try {
            let { day, week, date, month, year, userId, message } = req.body;

            day = day.toLowerCase();
            month = month.toLowerCase();
            const timedDate = getLocalDateString(date);

            const userHolidays = await Holiday.find({ userId });
            if (userHolidays.length > 0) {
                const existingHoliday = userHolidays.find(holiday => getTimedDate(holiday.date) === getTimedDate(timedDate));
                if (existingHoliday) {
                    return res.status(400).json({ message: "User already has added this holiday" });
                }
            }

            const newHoliday = await Holiday.create({
                day,
                week,
                date: timedDate,
                month,
                year,
                userId,
                isHoliday: true,
                message,
            });
            res.status(201).json({ message: "Holiday added successfully", holiday: newHoliday });
        } catch (error) {
            console.log(error);

            res.status(500).json({ message: "Error adding holiday", error });
        }
    },
}

module.exports = holidayController;