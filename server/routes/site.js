const express = require("express");
const { createCategory, createSubcategory, getCategories } = require("../controllers/site");
const router = express.Router();


// CREATE NEW CATEGORY
router.post('/category/create', createCategory);

// CREATE NEW SUBCATEGORY
router.post('/category/sub/create/:categoryId', createSubcategory);

//GET CATEGORIES
router.get('/category', getCategories);


module.exports = router;