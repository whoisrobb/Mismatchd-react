const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const siteRoutes = require('./routes/site');
const storeRoutes = require('./routes/stores');
const { sequelize } = require('./models');

/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(cors());
app.use('/files', express.static(path.join(__dirname, 'files')));


/* ROUTES */
app.use('/site', siteRoutes);
app.use('/store', storeRoutes);


/* SEQUELIZE SETUP */
sequelize.sync()
    .then(() => {
        console.log('Database and tables synced')
    })
    .catch((err) => {
        console.error(err)
    })

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));