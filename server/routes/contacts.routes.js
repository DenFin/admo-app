const express = require('express')
const router = express.Router()
const Contact = require('../models/contact.model')
const ContactController = require('../controllers/contact.controller')




router.get('/', ContactController.getContacts)

router.get('/amount', ContactController.getContactAmount)

router.get('/:id', ContactController.getContactById)

router.post('/', ContactController.createContact)

router.patch('/:id', ContactController.updateContactById)

router.delete('/:id', ContactController.deleteContactById)

router.post('/avatar/upload', ContactController.uploadAvatar)

// router.post('/avatar/upload', upload.single('file'), (req, res) => {
//     console.log(req.file)
//     res.json({ file: req.file })
// })













































// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
//     console.log(file.mimetype)
//     if (!allowedTypes.includes(file.mimetype)) {
//         const error = new Error("Incorrect file");
//         error.code = "INCORRECT_FILETYPE"

//         return cb(error, false)
//     }

//     cb(null, true)
// }

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '.jpg') //Appending .jpg
//     }
// })

// const upload = multer({
//     storage: storage
// })






































router.get('/birthdays', async(req, res) => {
    try {
        const contacts = await Contact.find()

        checkContacts(contacts)

        res.json(contacts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})









module.exports = router