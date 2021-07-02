let express = require('express');
let multer = require('multer');
let fs = require('fs')
let fileConfig = require('../config/fileConfig.js')
let path = require('path');
let log4js = require('log4js');
const dbConfig = require("../config/dbConfig");
const cmd = require("node-cmd");
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
                            fileName: fileName,
                            token: 'uploadedFile'
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
            let filePath = req.body.filePath;
            logger.debug('compileSource:', filePath)

            try {
             await fileConfig.compileProcess('clang', [filePath, '-o', filePath.replace('.c', '')], {},`${filePath.replace('.c','-process.log')}`,function (cb) {
                 if (cb === 'process ended') {
                        let readStream = fs.createReadStream(filePath.replace('.c','-process.log'))
                        let data = '';
                        readStream.on('data', function (chunk) {
                            data += chunk
                            res.json({compileData: data})
                        });
                        readStream.on('error', function(err) {
                            res.end(err);
                        });
                     }
                })
            }catch (error) {
                logger.error(error)
            }
})

router.route('/executeSourceFile').post(async (req, res) => {
            let filePath = req.body.filePath;
            logger.debug('executeSource;', filePath)
            try {
                await fileConfig.executeProcess(`${filePath.replace('.c','')}`,[],{stdio:'inherit',encoding:'utf8'},`${filePath.replace('.c','-process.log')}`,function (cb) {
                    if (cb === 'process ended') {
                        let readStream = fs.createReadStream(filePath.replace('.c','-process.log'))
                        let data = '';
                        readStream.on('data', function (chunk) {
                            data += chunk
                            res.send({executeData: data})
                        });
                        readStream.on('error', function(err) {
                            res.end(err);
                        });
                    }
                })
            }catch (error) {
                logger.error(error)
            }
})

router.route('/debugSourceFile').post(async (req, res) => {
            let filePath = req.body.filePath;
            logger.debug('debugSource:', filePath)
            try {
                await fileConfig.debugProcess(`lldb`,`${filePath.replace('.c','')}`,{stdio:'inherit',encoding:'utf8'},`${filePath.replace('.c','-process.log')}`,function (cb) {
                    if (cb === 'process ended') {
                        let readStream = fs.createReadStream(filePath.replace('.c', '-process.log'))
                        let data = '';
                        readStream.on('data', function (chunk) {
                            data += chunk
                            res.send({debugData: data})
                        });
                        readStream.on('error', function (err) {
                            res.end(err);
                        });
                    }
                })
            } catch (error) {
                logger.error(error)
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
