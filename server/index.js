const express = require('express');
const cors = require('cors');
require('dotenv').config();
const storeRoutes = require('./routes/site');
const { sequelize } = require('./models');

/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(cors());


/* ROUTES */
app.use('/site', storeRoutes);


/* SEQUELIZE SETUP */
// sequelize.sync({ force: true })
sequelize.sync()
    .then(() => {
        console.log('Database and tables synced')
    })
    .catch((err) => {
        console.error(err)
    })

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));