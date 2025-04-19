const { z } = require("zod")
const { months, days } = require("../constants")

const validator = {
    validate: (schema) => (req, res, next) => {
        const data = schema.safeParse(req.body)
        if (data.success) {
            next()
        } else {
            res.status(400).json({ message: data.error.errors[0].path + ' ' + data.error.errors[0].message })
        }
    },
    holidaySchema: z.object({
        day: z.string().refine((val) => days.includes(val), "day must be one of the following: " + days.join(",")),
        week: z.number().min(1, "week can not be empty").max(5, "week can not be more than 5"),
        date: z.string().date({ message: "date must be a valid date format (YYYY-MM-DD)" }).transform((val) => new Date(val).getDate()).refine((val) => val > 0 && val <= 31, "date must be between 1 and 31"),
        month: z.string().min(1, "month can not be empty").max(20).refine((val) => months.includes(val), "month must be one of the following: " + months.join(",")),
        year: z.number().min(2000, "year can not be less than 2000").max(2030, "year can not be more than 2030"),
        userId: z.string().min(1, "userId can not be empty").max(50),
        message: z.string().min(1, "message can not be empty").max(50),
    }),
    getTimedDate: (dateInput) => {
        return new Date(dateInput).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    },
    getLocalDateString : (dateInput) => {  
        return new Date(dateInput).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZoneName: "short",
        });
    }
}

module.exports = validator