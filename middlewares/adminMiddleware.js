const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token required" });
        }

        let decoded = jwt.verify(token, process.env.jwtSecretKey);

        // Check if user is admin
        if (decoded.userType !== "admin") {
            return res.status(403).json({ message: "Access denied. This requires admin Login." });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = adminMiddleware;
