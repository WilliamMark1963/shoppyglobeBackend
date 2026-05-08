import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Grabs token from 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // This adds the user ID to the request object
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid Token" });
    }
};