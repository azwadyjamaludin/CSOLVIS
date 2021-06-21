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
        let variable = ''; let formula = ''
        let varArray = []; let formulaArray = []
        try {
        await dbConfig.getData(queryData, params, function (cb) {
                if(cb.success === true) {
                        for (let result of cb.message) {
                             variable = result['variable']; formula = result['formula']
                                varArray.push(variable); formulaArray.push(formula)
                        }
                        res.json({variable:varArray,formula:formulaArray})
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
                                        let queryData = `SELECT input,process,output FROM ipo WHERE session_id = (?)`
                                        let params = [sesionID]
                                        dbConfig.getData(queryData,params,function (cb) {
                                                res.json({ipo:cb.message})
                                        })
                                }
                        })
                }
        })
        }catch (error) {
          logger.error(error)
        }
})

module.exports = router
