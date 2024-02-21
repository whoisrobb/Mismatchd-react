const express = require("express");
const { createCategory, createSubcategory, getCategories, deleteCategory, deleteSubcategory } = require("../controllers/site");
const router = express.Router();


// CREATE NEW CATEGORY
router.post('/category/create', createCategory);

// CREATE NEW SUBCATEGORY
router.post('/category/sub/create/:categoryId', createSubcategory);

//GET CATEGORIES
router.get('/category', getCategories);

// DELETE CATEGORY
router.delete('/category/:categoryId', deleteCategory);

// DELETE SUBCATEGORY
router.delete('/category/sub/:subcategoryId', deleteSubcategory);


module.exports = router;