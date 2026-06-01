import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const token = authHeader;

  try {
    const user = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
