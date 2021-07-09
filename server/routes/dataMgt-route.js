let express = require('express')
let log4js = require('log4js');
let logger = log4js.getLogger('dataMgt.js')
let router = express.Router();
let dbConfig = require('../config/dbConfig')

router.route('/createSessionID').post(async (req, res) => {
        let sesionID = req.body.sessionID;
        let sqlInsert = 'INSERT INTO session (session_id) VALUES (?)'
        let data = [sesionID]
        try {
        await dbConfig.insertData(sqlInsert, data, function (cb) {
                if (cb.success === true) {
                        let queryData = 'SELECT session_id FROM session WHERE session_id = (?)'
                        let params = [sesionID]
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

router.route('/step1').post( async (req, res) => {
        let sesionID = req.body.sessionID; let input = req.body.input; let process = req.body.process; let variable = req.body.variable
        logger.info(sesionID,input,process,variable)
        let sqlInsert = `INSERT INTO ipo(input,process,variable,session_id) VALUES(?,?,?,?)`
        let data = [input,process,variable,sesionID]
        try {
        await dbConfig.insertData(sqlInsert,data, function (cb) {
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
                                if(result['variable'] != '' ) {
                            varArray.push(result['variable']);}
                                if (result['formula'] != '') {
                                formulaArray.push(result['formula'])}
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
        let sesionID = req.body.sessionID;
        let deleteData = `DELETE FROM session WHERE session_id = (?)`
        let params = [sesionID]
        try {
        await dbConfig.deleteRow(deleteData, params, function (cb) {
                if(cb.success === true) {
                        let deleteOtherData = `DELETE FROM ipo WHERE session_id = (?)`
                        let params = [sesionID]
                        dbConfig.deleteRow(deleteOtherData,params,function (cb) {
                                if(cb.success === true) {
                                        let deleteOtherData = `DELETE FROM file WHERE session_id = (?)`
                                        let params = [sesionID]
                                        dbConfig.deleteRow(deleteOtherData,params,function (cb) {
                                                if(cb.success === true) {
                                                        let queryData = `SELECT input,process,output FROM ipo WHERE session_id = (?)`
                                                        let params = [sesionID]
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
        let sesionID = req.body.sessionID; let emptyData = false;
        let queryData = `SELECT input,process,output from ipo WHERE session_id = (?)`
        let params = [sesionID]
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
