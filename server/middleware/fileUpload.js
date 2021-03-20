const fs = require('fs');
const multer = require('multer')


const baseDir = 'uploads/'
const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1
const currentYearDir = `${baseDir}${currentYear}`
const currentMonthDir = `${baseDir}${currentYear}/${currentMonth}`

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, currentMonthDir)
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '.jpg') //Appending .jpg
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Incorrect file");
        error.code = "INCORRECT_FILETYPE"

        return cb(error, false)
    }

    cb(null, true)
}

module.exports = {
    checkFolderStructure: function(req, res, next) {

        // Check if current year folder exists
        if (!fs.existsSync(currentYearDir)) {
            fs.mkdirSync(currentMonthDir, {
                recursive: true
            });
        } else {
            if (!fs.existsSync(currentMonthDir)) {
                fs.mkdirSync(currentMonthDir, {
                    recursive: true
                });
            }
        }
        next();
    },

    upload: multer({
        storage: storage,
        fileFilter: (req, file, cb) => {

            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            if (!allowedTypes.includes(file.mimetype)) {
                const error = new Error("Incorrect file");
                error.code = "INCORRECT_FILETYPE"
                return cb(error, false)
            }
            cb(null, true)
        }
    })

}