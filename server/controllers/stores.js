const db = require("../models");
const Store = db.Store;
const Product = db.Product;


// CREATE NEW STORE
const createStore = async (req, res) => {
    try {
        const { name, userId } = req.body;

        const newStore = await Store.create({ name, userId });

        res.status(201).json({ message: `Successfully created store ${newStore}` });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// GET ALL STORES
const getStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.status(200).json(stores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// GET SINGLE STORE
const getSingleStore = async (req, res) => {
    try {
        const { storeId } = req.params;

        const store = await Store.findByPk(storeId, {
            include: [{
                model: Product
            }]
          });
      
        
        if (!store) {
            return res.status(404).message({ message: 'Store not found!' });
        }

        res.status(200).json(store);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// CREATE PRODUCT
const createProduct = async (req, res) => {
    try {
        const { storeId } = req.params;
        const imageUrls = req.files.map((file) => `uploads/${file.filename}`);

          // Create a new product instance with validated data and image URLs
        const newProduct = await Product.create({
            ...req.body,
            StoreStoreId: storeId,
            imageUrls,
        });
      
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// GET PRODUCTS

// GET SINGLE PRODUCT


module.exports = {
    createStore,
    getStores,
    getSingleStore,
    createProduct,
};