const db = require("../models");
const { Op } = require('sequelize');
const Store = db.Store;
const Product = db.Product;


// CREATE NEW STORE
const createStore = async (req, res) => {
    try {
        const { name, userId, description } = req.body;

        const newStore = await Store.create({ name, userId, description });

        res.status(201).json({ message: `Successfully created store ${newStore}` });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// DELETE STORE
const deleteStore = async (req, res) => {
    try {
        const { storeId } = req.params;
        const store = await Store.findByPk(storeId);
        await store.destroy();
        res.status(200).json({ message: 'Deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
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
        const imageUrls = req.files.map((file) => `${file.filename}`);

        const newProduct = await Product.create({
            ...req.body,
            StoreStoreId: storeId,
            imageUrls,
        });
      
        res.status(201).json({ message: `Successfully created ${req.body.name}` });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {
      const { storeId } = req.params;
      const { productId } = req.body;
  
      const product = await Product.findByPk(productId);
  
    let updatedImageUrls = [];
    if (req.files && req.files.length > 0) {
        updatedImageUrls = req.files.map((file) => {
            return `${file.filename}`;
        });
    } else {
        updatedImageUrls = product.imageUrls || []; 
    }

    const updatedProduct = await product.update({
        ...req.body,
        StoreStoreId: storeId,
        imageUrls: updatedImageUrls,
    });
  
    res.status(201).json({ message: 'Updated successfully.' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

// GET PRODUCTS WITH FILTERS
const getProducts = async (req, res) => {
    try {
        const { priceFrom, priceTo, dateFrom, dateTo, order, orderBy, category, subCategory, storeId } = req.body;

        // Build Sequelize query conditionals based on provided filters
        const where = {};
        if (priceFrom) {
            where.price = { [Op.gte]: priceFrom }; // Greater than or equal to priceFrom
        }
        if (priceTo) {
            where.price = { ...where.price, [Op.lte]: priceTo }; // Less than or equal to priceTo
        }
        if (dateFrom) {
            where.createdAt = { [Op.gte]: dateFrom }; // Greater than or equal to dateFrom
        }
        if (dateTo) {
            where.createdAt = { ...where.createdAt, [Op.lte]: dateTo }; // Less than or equal to dateTo
        }
        if (category) {
          where.category = category;
        }    
        if (subCategory) {
          where.subCategory = subCategory;
        }    
        if (storeId) {
          where.StoreStoreId = storeId;
        }    

        // Build Sequelize order options based on user input
        const orderOptions = [];
        if (orderBy) {
            orderOptions.push([orderBy, order === 'asc' ? 'ASC' : 'DESC']);
        } else {
            // Fallback default order (e.g., created_at DESC)
            orderOptions.push(['createdAt', 'DESC']);
        }

        // Fetch products with filters and order
        const products = await Product.findAll({
            where,
            order: orderOptions,
        });

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// GET STORE PRODUCTS
const getStoreProducts = async (req, res) => {
    try {
        const { storeId } = req.params;
        const products = await Product.findAll({ where: { StoreStoreId: storeId } });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByPk(productId);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByPk(productId);
        await product.destroy();
        res.status(200).json({ message: 'Deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    createStore,
    deleteStore,
    getStores,
    getSingleStore,
    createProduct,
    updateProduct,
    getProducts,
    getStoreProducts,
    getSingleProduct,
    deleteProduct,
};