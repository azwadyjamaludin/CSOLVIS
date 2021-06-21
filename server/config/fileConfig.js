const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const datetime = require('node-datetime');
const {spawn} = require('child_process')
let logger = log4js.getLogger('fileConfig.js')
let multer = require('multer');

let uploadPathUser = ''; let uploadPathUserNormalise = ''
uploadPathUser = path.join(__dirname, '../files/saveFile/');
uploadPathUserNormalise = path.normalize(uploadPathUser)

if (!fs.existsSync(uploadPathUserNormalise)) {
    fs.mkdirSync(uploadPathUserNormalise)
}

let storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        await cb(null, uploadPathUserNormalise)
    },
    filename: async function (req, file, cb) {
        let ts = Date.now();
        let date_ob = datetime.create(ts);
        let formatted = date_ob.format('d-m-Y_HhrM-S')
        await cb(null,formatted+'+'+file.originalname)
    }
})

let uploadConfig = multer({
    storage: storage
}).single('file');

module.exports = {uploadConfig,spawn}
