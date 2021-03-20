const express = require('express')
const router = express.Router()
const Contact = require('../models/contact.model')
const ContactController = require('../controllers/contact.controller')
const upload = require('../middleware/fileUpload')


router.get('/', ContactController.getContacts)

router.get('/amount', ContactController.getContactAmount)

router.get('/:id', ContactController.getContactById)

router.post('/', ContactController.createContact)

router.patch('/:id', ContactController.updateContactById)

router.delete('/:id', ContactController.deleteContactById)

router.post('/avatar/upload', upload.checkFolderStructure, upload.upload.single('file'), ContactController.uploadAvatar)


module.exports = router