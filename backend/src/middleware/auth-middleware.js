
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // const token = req.header('Authorization');
       const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: "Access Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user data to request object
        next();
    } catch (error) {
        res.status(401).json({ msg: "Invalid Token" });
    }
};

module.exports = authMiddleware;
