let express = require('express');
let multer = require('multer');
let fs = require('fs')
let fileConfig = require('../config/fileConfig.js')
let path = require('path');
let log4js = require('log4js');
const dbConfig = require("../config/dbConfig");
let logger = log4js.getLogger('fileMgt.js')
let router = express.Router();

router.route('/writeFileToServer').post((req,res) => {
            try{
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
                                success: false,
                                message: "No file found!"
                            })
                        }
                        let filePath = req.file.path
                        let fileName = path.basename(filePath)
                        let fileContents = fs.readFileSync(filePath)
                        logger.debug('filePath:',filePath,'fileName:',fileName,'fileContents:',fileContents.toString())
                        fs.unlink(filePath,(err) => {
                            logger.debug('C file removed:',filePath)
                        })
                        res.json({
                            uploadPath: filePath,
                            fileContents:fileContents.toString(),
                            fileName: fileName
                        })
                    })
            }catch (error) {
                logger.error(error)
            }
})

router.route('/sendCurrentFile').post((req,res) => {
            try {
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
                    res.json({currentFilePath: filePath})
                })
            }catch (error) {
                logger.error(error)
            }
})

router.route('/compileSourceFile').post( async (req, res) => {
            try {
             await fileConfig.compileProcess(req,res)
            }catch (error) {
                logger.error(error)
            }
})

router.route('/compileSourceForDebug').post( async (req, res) => {
    try {
        await fileConfig.compileProcess2(req,res)
    }catch (error) {
        logger.error(error)
    }
})

router.route('/removeLogFiles').post(async (req,res) => {
    let normaliseDir = fileConfig.uploadPathUserLogNormalise; let sesID = req.body.sesID
            if (fs.existsSync(path.join(normaliseDir+sesID+'+cmdX.log'))) {
            fs.unlink(path.join(normaliseDir+sesID+'+cmdX.log'), err => {
                if (err) throw err;
                })
            }
            if (fs.existsSync(path.join(normaliseDir+sesID+'+cmdD.log'))) {
            fs.unlink(path.join(normaliseDir+sesID+'+cmdD.log'), err => {
                if (err) throw err;
                })
            }
    })

router.route('/storedFile').post((req,res) => {
            try {
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
                                success: false,
                                message: "No file found!"
                            })
                        }
                            let filePath = req.file.path
                            let fileName = path.basename(filePath)
                            res.json({filename:fileName,filepath:filePath})
                        })
            }catch (error) {
                logger.error(error)
            }
})

router.route('/getStoredData').post (async (req, res) => {
                let sessionID = req.body.sessionID;
                let queryData = `SELECT filepath,filename from file WHERE session_id = (?)`
                let params = [sessionID]; let fileContents = ''; let fileName = '';
                try {
                    await dbConfig.getData(queryData, params, function (cb) {
                        if (cb.success === true) {
                            for (let result of cb.message) {
                                let filePath = result['filepath']
                                fileName = result['filename']
                                try {
                                fileContents = fs.readFileSync(filePath)
                                }catch (err){
                                    if(err.code === 'ENOENT') {
                                        fileContents = 'enoent';
                                    } else {
                                        fileContents = 'something wrong somewhere'
                                    }
                                }
                            }
                        res.json({fileContents:fileContents.toString(),fileName:fileName})
                        }
                    })
                } catch (error) {
                    logger.error(error)
                }
})
module.exports = router
