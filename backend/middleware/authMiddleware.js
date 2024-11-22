const jwt = require('jsonwebtoken');
const User = require("../../backend/model/user");

const protect = async (req, res, next) => {

    let token;

    if (req.cookies.token) {
        try {
            token = req.cookies.token;

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Admin access required' });
    }
};

module.exports = { protect, admin };
