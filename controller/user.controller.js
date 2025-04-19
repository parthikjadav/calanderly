const User = require("../model/user.model");

const userController = {
    addUser: async (req, res) => {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ message: "Name is required" });
            }
            const newUser = await User.create({ name });
            res.status(201).json({ message: "User added successfully", user: newUser });
        } catch (error) {
            res.status(500).json({ message: "Error adding user", error });
        }
    }
}

module.exports = userController;