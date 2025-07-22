const express = require('express');
const router = express.Router();
const {
  createCategory,
  assignOrganizer,
  getCategories,
  deleteCategory
} = require("../Controller/SportsCategoriesController");

// POST /api/sport-categories
router.post("/", createCategory);

// PUT /api/sport-categories/:id/assign-organizer
router.put("/:id/assign-organizer", assignOrganizer);

// GET /api/sport-categories
router.get("/", getCategories);

// DELETE /api/sport-categories/:id
router.delete("/:id", deleteCategory);

module.exports = router;
