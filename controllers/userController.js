const userModel = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
    try {
        let users = await userModel.find().select("-password").sort({ _id: -1 });
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedUser = await userModel.findByIdAndDelete(id);

        if (deletedUser) {
            res.status(200).json({ message: "User deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        let { id } = req.params;
        let { userType } = req.body;

        if (!userType || !["citizen", "volunteer", "admin"].includes(userType)) {
            return res.status(400).json({ message: "Invalid user type" });
        }

        let updatedUser = await userModel.findByIdAndUpdate(
            id,
            { userType },
            { new: true }
        ).select("-password");

        if (updatedUser) {
            res.status(200).json({ message: "User role updated successfully", user: updatedUser });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getUserStats = async (req, res) => {
    try {
        let totalUsers = await userModel.countDocuments();
        let citizens = await userModel.countDocuments({ userType: "citizen" });
        let volunteers = await userModel.countDocuments({ userType: "volunteer" });
        let admins = await userModel.countDocuments({ userType: "admin" });

        res.status(200).json({
            totalUsers,
            citizens,
            volunteers,
            admins
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
