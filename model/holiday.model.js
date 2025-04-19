const { default: mongoose } = require("mongoose");

const holidaySchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
    },
    week: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isHoliday: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Holiday = mongoose.model("Holiday", holidaySchema);

module.exports = Holiday;