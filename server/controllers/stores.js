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
        const imageUrls = req.files.map((file) => `${file.filename}`);

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
  
    res.status(201).json(updatedProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};

// GET PRODUCTS
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

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
        const { productId } = re.params;
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
    getStores,
    getSingleStore,
    createProduct,
    updateProduct,
    getProducts,
    getStoreProducts,
    getSingleProduct,
    deleteProduct,
};