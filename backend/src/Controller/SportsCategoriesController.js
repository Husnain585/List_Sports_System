const SportCategory = require('../Models/SportsCategory');

// Create a new sport category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await SportCategory.findOne({ name });
    if (existing) return res.status(400).json({ success: false, message: "Category already exists" });

    const newCategory = new SportCategory({ name });
    await newCategory.save();

    res.status(201).json({ success: true, message: "Category created", category: newCategory });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// Assign organizer to a category
exports.assignOrganizer = async (req, res) => {
  try {
    const { organizerId } = req.body;

    const category = await SportCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    category.organizer = organizerId;
    await category.save();

    res.json({ success: true, message: "Organizer assigned", category });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// Get all sport categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await SportCategory.find().populate("organizer", "name email");
    res.json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await SportCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    res.json({ success: true, message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
};
