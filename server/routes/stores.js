const express = require("express");
const { getStores,
    createStore,
    getSingleStore,
    createProduct,
    getProducts,
    updateProduct,
    getStoreProducts,
    getSingleProduct,
    deleteProduct
} = require("../controllers/stores");
const upload = require("../controllers/upload");
const router = express.Router();


// GET ALL THE PRODUCTS
router.get('/products', getProducts);

// GET PRODUCTS WITH FILTERS
router.post('/products/filtered', getProducts);

// GET SINGLE PRODUCT
router.get('/products/:productId', getSingleProduct);

// DELETE PRODUCT
router.delete('/products/:productId', deleteProduct);

// GET STORE PRODUCTS
router.get('/:storeId/products', getStoreProducts);

// GET SINGLE STORE
router.get('/:storeId', getSingleStore);

// CREATE NEW STORE
router.post('/create', createStore);

// CREATE NEW PRODUCT
router.post('/products/create/:storeId', upload.array('file'), createProduct);

// UPDATE PRODUCT
router.patch('/products/update/:storeId', upload.array('file'), updateProduct);

// GET ALL THE STORES
router.get('/', getStores);


module.exports = router;