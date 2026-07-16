import jwt from "jsonwebtoken";

const isLoggedIn = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
};

export default isLoggedIn;