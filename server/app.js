require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to database"))

app.use(express.json())
app.use(cors());

const authRouter = require("./routes/auth")
const contactsRouter = require("./routes/contacts.routes")
const clientsRouter = require("./routes/clients")
const billingsRouter = require("./routes/billing.routes")


app.use("/auth", authRouter)
app.use("/api/contacts", contactsRouter)
app.use("/api/clients", clientsRouter)
app.use("/api/billings", billingsRouter)


app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`));