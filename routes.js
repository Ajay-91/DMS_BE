const express = require("express");
const authController = require("./controllers/authController");
const reportController = require("./controllers/reportController");
const jwtMiddleware = require("./middlewares/jwtMiddleware");
const adminMiddleware = require("./middlewares/adminMiddleware");
const userController = require("./controllers/userController");
const router = express.Router();

router.post('/registerUser', authController.registerUser)

router.post('/loginUser', authController.loginUser)

router.post("/googleLogin", authController.googleLogin)

router.post('/add-report', jwtMiddleware, reportController.addReport)

router.get('/all-reports', jwtMiddleware, reportController.getAllReports)

router.get('/user-reports', jwtMiddleware, reportController.getUserReports)

router.put('/update-report/:id', jwtMiddleware, reportController.updateReportStatus)

router.get('/admin/users', adminMiddleware, userController.getAllUsers)

router.delete('/admin/users/:id', adminMiddleware, userController.deleteUser)

router.put('/admin/users/:id/role', adminMiddleware, userController.updateUserRole)

router.get('/admin/stats', adminMiddleware, userController.getUserStats)

router.delete('/admin/reports/:id', adminMiddleware, reportController.deleteReport)

module.exports = router;
