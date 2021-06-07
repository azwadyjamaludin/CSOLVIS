const express = require('express');
const multer = require('multer');
const fs = require('fs')
const fileConfig = require('../config/fileConfig.js')
const path = require('path');
const log4js = require('log4js');
let logger = log4js.getLogger('fileConfig.js')
let router = express.Router();

router.route('/writeFileToServer').post((req,res) => {
            fileConfig.uploadConfig(req,res, function (err) {
                if (err instanceof multer.MulterError) {
                    logger.error(err);
                    return res.status(500).json(err)
                } else if (err) {
                    logger.error(err);
                    return res.status(500).json(err)
                } else if (!req.file) {
                    logger.warn("No file found!");
                    return res.status(400).json({
                        "success": false,
                        "message": "No file found!"
                    })
                }
                let filePath = req.file.path
                logger.debug(filePath)
                let fileName = path.basename(filePath)
                let fileContents = fs.readFileSync(filePath).toString()
                return res.json({
                    'uploadPath': filePath,
                    'fileContents':fileContents,
                    'fileName': fileName
                })
            })
})

module.exports = router