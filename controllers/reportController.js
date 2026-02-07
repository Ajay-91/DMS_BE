const reportModel = require("../models/reportModel");

exports.addReport = async (req, res) => {
    try {
        let { type, location, severity, description } = req.body;

        if (type && location && severity && description) {
            let newReport = reportModel({
                type,
                location,
                severity,
                description,
            });
            await newReport.save();
            res
                .status(201)
                .json({ message: "Report submitted successfully", newReport });
        } else {
            res.status(400).json({ message: "Pls fill the required fields" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAllReports = async (req, res) => {
    try {
        let reports = await reportModel.find().sort({ createdAt: -1 });
        res.status(200).json({ reports });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getUserReports = async (req, res) => {
    try {
        let reports = await reportModel.find().sort({ createdAt: -1 });
        res.status(200).json({ reports });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateReportStatus = async (req, res) => {
    try {
        let { id } = req.params;
        let { status } = req.body;

        if (status && ["Active", "Resolved"].includes(status)) {
            let updatedReport = await reportModel.findByIdAndUpdate(
                id,
                { status }
            );

            if (updatedReport) {
                res.status(200).json({ message: "Report status updated" });
            } else {
                res.status(404).json({ message: "Report not found" });
            }
        } else {
            res.status(400).json({ message: "Invalid status value" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteReport = async (req, res) => {
    try {
        let { id } = req.params;
        let deletedReport = await reportModel.findByIdAndDelete(id);

        if (deletedReport) {
            res.status(200).json({ message: "Report deleted successfully" });
        } else {
            res.status(404).json({ message: "Report not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};


