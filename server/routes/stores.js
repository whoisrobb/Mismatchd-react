const express = require("express");
const { getStores, createStore, getSingleStore, createProduct } = require("../controllers/stores");
const upload = require("../controllers/upload");
const router = express.Router();


// GET ALL THE STORES
router.get('/', getStores);

// GET SINGLE STORE
router.get('/:storeId', getSingleStore);

// CREATE NEW STORE
router.post('/create', createStore);

// CREATE NEW PRODUCT
router.post('/products/create/:storeId', upload.array('file'), createProduct);


module.exports = router;