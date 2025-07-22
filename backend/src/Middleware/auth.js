require("dotenv").config();
const { verify } = require("jsonwebtoken");
const responseHandler = require("../../responseHandler");

// Protect Routes (Authentication)  this is earlier auth which i use with frontend
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return responseHandler(res, { error: "Unauthorized User" });
    }

    const token = authHeader.split(" ")[1];

    verify(token, process.env.SECRET, (error, data) => {
      if (error) {
        return responseHandler(res, { error: "Forbidden Access" });
      }
      req.user = { ...data };
      next();
    });
  } catch (error) {
    return responseHandler(res, { error: error.message });
  }
};


// Role-based Access Control (Authorization)
const role = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return responseHandler(res, { error: "Access denied" });
    }
    next();
  };
};

module.exports = { auth, role };
