require("dotenv").config();
const User = require("../Models/usersSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const responseHandler = require("../../responseHandler");

module.exports = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return responseHandler(res, { error: "Email and password are required" });
      }
      const normalizedEmail = email.trim().toLowerCase();
      const user = await User.findOne({
        email: { $regex: new RegExp(`^${normalizedEmail}$`, "i") },
      });
      if (!user) {
        res.clearCookie("auth");
        return responseHandler(res, { error: "Invalid credentials" });
      }

      if (user.role === 'coach' && !user.approved) {
        return res.status(403).json({ message: "Coach account pending approval" });
      }

      if (user.role === 'participant' && !user.approvedByCoach) {
        return res.status(403).json({ message: "Participant account pending coach approval" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.clearCookie("auth");
        return responseHandler(res, { error: "Invalid credentials" });
      }

      const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        approved: user.approved,
        approvedByCoach: user.approvedByCoach
      };

      const token = jwt.sign(userData, process.env.SECRET, { expiresIn: "1h" });

      res.cookie("auth", token, { maxAge: 3600000, httpOnly: true, sameSite: "lax" });
      return responseHandler(res, { response: { token, user: userData } });

    } catch (error) {
      console.error("Login error:", error);
      return responseHandler(res, { error: "Something went wrong, try again." });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("auth");
      return responseHandler(res, { response: { message: "Logout successful" } });
    } catch (error) {
      console.error("Logout error:", error);
      return responseHandler(res, { error: "Error logging out" });
    }
  }
};
