require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { handleError, ErrorHandler } = require('./helpers/error')



/**
 * DATABASE
 */
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useFindAndModify', false);

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to database"))


/**
 * MIDDLEWARE
 */
app.use(express.json())
app.use(cors());
app.use("/uploads", express.static('uploads'));
app.use((err, req, res, next) => {
    handleError(err, res);
});

/**
 * ROUTES
 */
const authRouter = require("./routes/auth")
const contactsRouter = require("./routes/contacts.routes")
const contactCategoriesRouter = require("./routes/contactCategories.routes")
const clientsRouter = require("./routes/clients.routes")
const billingsRouter = require("./routes/billing.routes")
const revenuesRouter = require("./routes/revenues.routes")

app.use("/auth", authRouter)
app.use("/api/contacts", contactsRouter)
app.use("/api/contactcategories", contactCategoriesRouter)
app.use("/api/clients", clientsRouter)
app.use("/api/billings", billingsRouter)
app.use("/api/revenues", revenuesRouter)

app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`));