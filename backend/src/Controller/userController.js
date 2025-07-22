const usersSchema = require("../Models/usersSchema");
const { hash } = require("bcrypt");
const responseHandler = require("../../responseHandler");


module.exports = {
  // Route: GET /api/check-admin
adminCheck: async (req, res) => {
  try {
    const admin = await usersSchema.findOne({ role: "admin" });
    res.json({ adminExists: !!admin });
  } catch (err) {
    res.status(500).json({ message: "Error checking admin", error: err.message });
  }
},

  getAllUsers: async (req, res) => {
    try {
      const user = await usersSchema.find();
      res.json(user);
    } catch (error) {
      console.error("Error in find user: ", error);
    }
  },

getOrganizers: async (req, res) => {
  try {
    // You treat "coach" as the organizer role
    const users = await usersSchema.find({ role: "coach" });

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No organizers (coaches) found",
      });
    }

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching organizers:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

  
  
  ,





  approveUser: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await usersSchema.findByIdAndUpdate(
        userId,
        { status: "approved",
          approved: true,
         },
        { new: true }
      );

      if (!user) {
        return responseHandler(res, {
          status: 404,
          message: "User not found",
          data: null,
        });
      }

      return responseHandler(res, {
        status: 200,
        message: "User approved successfully",
        data: user,
      });
    } catch (error) {
      console.error("Approve user error:", error);
      return responseHandler(res, {
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          error: "Name, email, and password are required",
        });
      }
  
      // Check if email already exists
      const existingUser = await usersSchema.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: "User with this email already exists",
        });
      }
  
      // ✅ Prevent creation of multiple admins
      if (role === "admin") {
        const existingAdmin = await usersSchema.findOne({ role: "admin" });
        if (existingAdmin) {
          return res.status(400).json({
            success: false,
            error: "An admin account already exists",
          });
        }
      }
  
      // Hash password and create user
      const hashedPassword = await hash(password, 10);
      const newUser = new usersSchema({
        name,
        email,
        password: hashedPassword,
        role: role || "participant", // Default role
        accountStatus: "active",
        approvalStatus: "pending-coach",
      });
  
      const savedUser = await newUser.save();
  
      // Return response without sensitive data
      const userResponse = {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        accountStatus: savedUser.accountStatus,
        approvalStatus: savedUser.approvalStatus,
      };
  
      return res.status(201).json({
        success: true,
        data: userResponse,
      });
  
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
        message: error.message,
      });
    }
  }
  ,
  rejectUser: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await usersSchema.findByIdAndUpdate(
        userId,
        { status: "rejected" },
        { new: true }
      );

      if (!user) {
        return responseHandler(res, {
          status: 404,
          message: "User not found",
          data: null,
        });
      }

      return responseHandler(res, {
        status: 200,
        message: "User rejected successfully",
        data: user,
      });
    } catch (error) {
      console.error("Reject user error:", error);
      return responseHandler(res, {
        status: 500,
        message: "Internal server error",
        error: error.message,
      });
    }
  },
  getOneUser: async (req, res) => {
    try {
      const user = await usersSchema.findOne();
      res.json(user);
    } catch (error) {
      console.error("Error in find user: ", error);
    }
  },
};
