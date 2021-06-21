let express = require('express');
let multer = require('multer');
let fs = require('fs')
let fileConfig = require('../config/fileConfig.js')
let path = require('path');
let log4js = require('log4js');
let logger = log4js.getLogger('fileMgt.js')
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
                        success: false,
                        message: "No file found!"
                    })
                }
                let filePath = req.file.path
                let fileName = path.basename(filePath)
                let fileContents = fs.readFileSync(filePath)
                logger.debug('filePath:',filePath,'fileName:',fileName,'fileContents:',fileContents.toString())
                res.json({
                    uploadPath: filePath,
                    fileContents:fileContents.toString(),
                    fileName: fileName,
                    token: 'uploadedFile'
                })
            })
})

router.route('/downloadSourceFile').post((req,res) => {
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
                res.download(filePath, fileName, (err) => {
                    if (err) {
                        res.status(500).send({
                            message: "Could not download the file. " + err,
                        });
                    }
                });
            })
})

router.route('/compileSouceFile').post((req,res) => {

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
                let clangCompile = fileConfig.spawn('clang'['-Wall',filePath,'-o',filePath.replace('.c','')])

                clangCompile.stdout.on('data',(data)=> {
                    res.json({'compileResult':data})
                })
                clangCompile.stderr.on('data',(data) => {
                    res.json({'compileResult':data})
                })
                clangCompile.on('close',(code) => {
                    if (code === 0) {
                    res.json({'compileResult': `Process exit with code ${code}`})
                    }
                })

            })
})

router.route('/executeSourceFile').post((req,res) => {
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
                let clangCompile = fileConfig.spawn('clang'['-Wall',filePath,'-o',filePath.replace('.c','')])
                let clangExecute = fileConfig.spawn(filePath.replace('.c',''))
                process.stdin.pipe(clangExecute.stdin)
                clangExecute.stdout.on('data',(data)=> {
                    res.json({'executeResult':data})
                })
                clangExecute.stderr.on('data',(data) => {
                    res.json({'executeResult':data})
                })
                clangExecute.on('close',(code) => {
                    if (code === 0) {
                    res.json({'executeResult': `Process exit with code ${code}`})
                    }
                })

            })
})

router.route('/debugSourceFile').post((req,res) => {
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
                let clangCompile = fileConfig.spawn('clang'['-g',filePath,'-o',filePath.replace('.c','')])
                let clangDebug = fileConfig.spawn('lldb'[filePath.replace('.c','')])
                process.stdin.pipe(clangDebug.stdin)
                clangDebug.stdout.on('data',(data)=> {
                    return res.json({'debugResult':data})
                })
                clangDebug.stderr.on('data',(data) => {
                    return res.json({'debugResult':data})
                })
                clangDebug.on('close',(code) => {
                    if (code === 0) {
                        return res.json({'debugResult': `Process exit with code ${code}`})
                    }
                })

            })
})

module.exports = router
