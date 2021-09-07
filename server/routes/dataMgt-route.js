let express = require('express')
let log4js = require('log4js');
let logger = log4js.getLogger('dataMgt.js')
let router = express.Router();
let dbConfig = require('../config/dbConfig')
let fs = require("fs");

router.route('/createSessionID').post(async (req, res) => {
        let sessionID = req.body.sessionID;
        let sqlInsert = 'INSERT INTO session (session_id) VALUES (?)'
        let data = [sessionID]
        try {
        await dbConfig.insertData(sqlInsert, data, function (cb) {
                if (cb.success === true) {
                        let queryData = 'SELECT session_id FROM session WHERE session_id = (?)'
                        let params = [sessionID]
                        let data = ''
                        dbConfig.getData(queryData, params, function (cb) {
                                for (let result of cb.message) {
                                        data = result['session_id']
                                        res.json({id:data})
                                }

                        })
                   }
           })
        }catch (error) {
          logger.error(error)
        }
})

router.route('/storeIPAddress').post(async (req, res) => {
        let ipAddress = req.body.ipAddress
        let sqlUpdate = 'UPDATE ipSett SET ipAddr = (?) WHERE table_id = (?)'
        let params = [ipAddress, 1]
        try {
                await dbConfig.updateData(sqlUpdate,params, function (cb) {
                        if (cb.success === true) {
                                let queryData = `SELECT ipAddr FROM ipSett WHERE table_id = (?)`
                                let params = [1]
                                dbConfig.getData(queryData,params, function (cb) {
                                        for (let result of cb.message) {
                                                res.json({ipAddress: result['ipAddr']})
                                        }
                                })
                        }
                })

        } catch (error) {
                logger.error(error)
        }
})

router.route('/getStoredIPAddress').get(async (req,res) => {
        let queryData = `SELECT ipAddr FROM ipSett WHERE table_id = (?)`
        let params = [1]
        try {
                await dbConfig.getData(queryData, params, function (cb) {
                        for (let result of cb.message) {
                        logger.debug('result:',result['ipAddr'])
                        res.json({ipAddress: result['ipAddr']})
                        }
                })
        } catch (error) {
                logger.error(error)
        }
})

router.route('/step1').post( async (req, res) => {
        let sessionID = req.body.sessionID; let input = req.body.input; let process = req.body.process; let variable = req.body.variable
        logger.info(sessionID,input,process,variable)
        let sqlInsert = `INSERT INTO ipo(input,process,variable,session_id) VALUES(?,?,?,?)`
        let data = [input,process,variable,sessionID]
        try {
        await dbConfig.insertData(sqlInsert,data, function (cb) {
                if (cb.success === true) {
                        let queryData = `SELECT input,process,output FROM ipo WHERE session_id = (?)`
                        let params = [sessionID]

                        dbConfig.getData(queryData,params,function (cb) {
                                        res.json({ipo:cb.message})
                        })
                }
        })
        }catch (error) {
          logger.error(error)
        }
})

router.route('/step2').post(async (req, res) => {
        let sessionID = req.body.sessionID; let output = req.body.output; let process = req.body.process; let variable = req.body.variable
        let sqlInsert = `INSERT INTO ipo(output,process,variable,session_id) VALUES(?,?,?,?)`
        let data = [output,process,variable,sessionID]
        try {
        await dbConfig.insertData(sqlInsert,data,function (cb) {
                if (cb.success === true) {
                        let queryData = 'SELECT input,process,output FROM ipo WHERE session_id = (?)'
                        let params = [sessionID]
                        dbConfig.getData(queryData, params, function (cb) {
                                        res.json({ipo:cb.message})

                        })
                }
        })
        }catch (error) {
          logger.error(error)
        }
})

router.route('/step3').post( async (req, res) => {
        let sesionID = req.body.sessionID; let input = req.body.input; let process = req.body.process; let variable = req.body.variable
        let sqlInsert = `INSERT INTO ipo(input,process,variable,session_id) VALUES(?,?,?,?)`
        let data = [input,process,variable,sesionID]
        try {
        await dbConfig.insertData(sqlInsert,data,function (cb) {
                if (cb.success === true) {
                        let queryData = `SELECT input,process,output FROM ipo WHERE session_id = (?)`
                        let params = [sesionID]
                        dbConfig.getData(queryData,params,function (cb) {
                                        res.json({ipo:cb.message})
                        })
                }
        })
        }catch(error) {
          logger.error(error)
        }
})

router.route('/step4').post( async (req, res) => {
        let sesionID = req.body.sessionID; let process = req.body.process; let formula = req.body.formula
        let sqlInsert = `INSERT INTO ipo(process,formula,session_id) VALUES(?,?,?)`
        let data = [process,formula,sesionID]
        try {
        await dbConfig.insertData(sqlInsert,data,function (cb) {
                if (cb.success === true) {
                        let queryData = `SELECT input,process,output FROM ipo WHERE (?)`
                        let params = [sesionID]
                        dbConfig.getData(queryData,params,function (cb) {
                                        res.json({ipo:cb.message})
                        })
                }
        })
        }catch (error) {
          logger.error(error)
        }
})

router.route('/step5').post( async (req, res) => {
        let sesionID = req.body.sessionID; let process = req.body.process;
        let sqlInsert = `INSERT INTO ipo(process,session_id) VALUES(?,?)`
        let data = [process,sesionID]
        try {
        await dbConfig.insertData(sqlInsert,data,function (cb) {
                if (cb.success === true) {
                        let queryData = `SELECT input,process,output FROM ipo WHERE session_id = (?)`
                        let params = [sesionID]
                        dbConfig.getData(queryData,params,function (cb) {
                                        res.json({ipo:cb.message})
                        })
                }
        })
        }catch (error) {
          logger.error(error)
        }
})

router.route('/step6').post( async (req, res) => {
        let sesionID = req.body.sessionID; let process = req.body.process; let variable = req.body.variable;
        let sqlInsert = `INSERT INTO ipo(process,variable,session_id) VALUES(?,?,?)`
        let data = [process,variable,sesionID]
        try {
        await dbConfig.insertData(sqlInsert,data,function (cb) {
                if (cb.success === true) {
                        let queryData = `SELECT input,process,output FROM ipo WHERE session_id = (?)`
                        let params = [sesionID]
                        dbConfig.getData(queryData,params,function (cb) {
                                        res.json({ipo:cb.message})
                        })
                }
        })
        }catch (error) {
          logger.error(error)
        }

})

router.route('/getVarsAndFormulas').post(async (req, res) => {
        let sesionID = req.body.sessionID;
        let queryData = `SELECT variable,formula from ipo WHERE session_id = (?)`
        let params = [sesionID]
        let varArray = []; let formulaArray = []; let emptyData = false;
        try {
        await dbConfig.getData(queryData, params, function (cb) {
                if(cb.success === true) {
                        if (cb.message === []) {
                                emptyData = true
                                res.json({emptyData:emptyData})
                        } else {
                        for (let result of cb.message) {
                                if(result['variable'] !== '' ) {
                            varArray.push('  '+result['variable']);}
                                if (result['formula'] !== '') {
                                formulaArray.push('  '+result['formula'])}
                        }
                        logger.debug('variable:',varArray.join('\n'), 'formula:',formulaArray.join('\n'))
                        res.json({variable:varArray.join('\n'),
                                    formula:formulaArray.join('\n')})
                        }
                }
        })
        }catch (error) {
          logger.error(error)
        }
})

router.route('/deleteRows').post(async (req, res) => {
        let sessionID = req.body.sessionID;
        let deleteData = `DELETE FROM session WHERE session_id = (?)`
        let params = [sessionID]
        try {
        await dbConfig.deleteRow(deleteData, params, function (cb) {
                if(cb.success === true) {
                        let deleteOtherData = `DELETE FROM ipo WHERE session_id = (?)`
                        let params = [sessionID]
                        dbConfig.deleteRow(deleteOtherData,params,function (cb) {
                                if(cb.success === true) {
                                        let query =  `SELECT filepath from file WHERE session_id = (?)`
                                        let params = [sessionID]
                                        dbConfig.getData(query,params, function (cb) {
                                                if (cb.success === true) {
                                                        for (let item of cb.message) {
                                                            if (fs.existsSync(item['filepath'])) {
                                                                fs.unlink(item['filepath'],(err) => {
                                                                        logger.debug('C file removed:',item['filepath'])
                                                                })
                                                            }
                                                            if (fs.existsSync(item['filepath'].replace('.c',''))) {
                                                                fs.unlink(item['filepath'].replace('.c',''),(err) => {
                                                                        logger.debug('file removed:',item['filepath'].replace('.c',''))
                                                                })
                                                            }
                                                                if (fs.existsSync(item['filepath'].replace('.c','-2'))) {
                                                                        fs.unlink(item['filepath'].replace('.c','-2'),(err) => {
                                                                                logger.debug('file removed:',item['filepath'].replace('.c','-2'))
                                                                        })
                                                                }
                                                             if (fs.existsSync(item['filepath'].replace('.c','.dSYM'))) {
                                                                fs.unlink(item['filepath'].replace('.c','.dSym'),(err) => {
                                                                        logger.debug('file removed:',item['filepath'].replace('.c','.dSYM'))
                                                                 })
                                                             }
                                                                if (fs.existsSync(item['filepath'].replace('.c','-2.dSYM'))) {
                                                                        fs.unlink(item['filepath'].replace('.c','-2.dSym'),(err) => {
                                                                                logger.debug('file removed:',item['filepath'].replace('.c','-2.dSYM'))
                                                                        })
                                                                }
                                                        }
                                                        let deleteOtherData = `DELETE FROM file WHERE session_id = (?)`
                                                        let params = [sessionID]
                                                        dbConfig.deleteRow(deleteOtherData,params,function (cb) {
                                                                if(cb.success === true) {
                                                                        let queryData = `SELECT input,process,output FROM ipo WHERE session_id = (?)`
                                                                        let params = [sessionID]
                                                                        dbConfig.getData(queryData,params,function (cb) {
                                                                                res.json({ipo:cb.message})
                                                                        })
                                                                }
                                                        })
                                                }else if (cb.success === false) {
                                                        let queryData = `SELECT input,process,output FROM ipo WHERE session_id = (?)`
                                                        let params = [sessionID]
                                                        dbConfig.getData(queryData,params,function (cb) {
                                                                res.json({ipo:cb.message})
                                                        })
                                                }
                                        })
                                }
                        })
                }
        })
        }catch (error) {
          logger.error(error)
        }
})

router.route('/storedData').post(async (req, res) => {
        let sesionID = req.body.sessionID;
        let filepath = req.body.filepath;
        let filename = req.body.filename
        let sqlInsert = `INSERT INTO file(filepath,filename,session_id) VALUES(?,?,?)`
        let data = [filepath, filename, sesionID]
        try {
                await dbConfig.insertData(sqlInsert, data, function (cb) {
                        if(cb.success === true) {
                                res.json({storedData:cb.message})
                        }
                })

        } catch (error) {
                logger.error(error)
        }
})

router.route('/getStoredIPOData').post(async (req, res) => {
        let sessionID = req.body.sessionID; let emptyData = false;
        let queryData = `SELECT input,process,output from ipo WHERE session_id = (?)`
        let params = [sessionID]
        try {
                await dbConfig.getData(queryData, params, function (cb) {
                        if (cb.success === true) {
                                if (cb.message === []) {
                                        emptyData = true
                                        res.json({emptyData:emptyData})
                                } else {
                                res.json({storedIPO:cb.message})
                                }
                        }


                })
        } catch (error) {
                logger.error(error)
        }
})

module.exports = router
