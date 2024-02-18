const db = require("../models");
const Category = db.Category;
const Subcategory = db.Subcategory;

// CREATE A NEW CATEGORY
const createCategory = async (req, res) => {
    try {
        const { title } = req.body;

        const newCategory = await Category.create({ title });

        res.status(201).json({ message: `Success creating category ${newCategory.title}` })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// CREATE NEW SUBCATEGORY
const createSubcategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { title, description } = req.body;

        const newSub = await Subcategory.create({ title, description, slug: title.toLowerCase(), CategoryCategoryId: categoryId });

        res.status(201).json({ message: `Success creating subcategory ${newSub.title}` })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// GET CATEGORIES
const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [{
                model: Subcategory
            }]
        });

        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json({ message: err.message })
    };
};


module.exports = {
    createCategory,
    createSubcategory,
    getCategories,
};