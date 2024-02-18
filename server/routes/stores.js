const express = require("express");
const { getStores, createStore, getSingleStore } = require("../controllers/stores");
const router = express.Router();


// GET ALL THE STORES
router.get('/', getStores);

// GET SINGLE STORE
router.get('/:storeId', getSingleStore);

// CREATE NEW STORE
router.post('/create', createStore);


module.exports = router;