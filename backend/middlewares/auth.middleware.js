const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "super_secret_key");

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = authMiddleware;