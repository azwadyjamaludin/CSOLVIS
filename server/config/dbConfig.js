const sqlite3 = require("sqlite3");
const path = require('path');
const mydb = path.join(__dirname, "../db/csolvis.db");
let log4js = require('log4js');
let logger = log4js.getLogger('dbConfig.js')

const db = new sqlite3.Database(mydb, err => {
    if (err) {
        return console.error(err.message);
    }
    logger.debug("Successful connection to the database 'csolvis.db'");
    db.close
});

async function insertData(sqlStatement,params,cb) {
    let sqlRes;
    if (params != null) {
    db.run(sqlStatement,params,function (err)  {
        if (err) {
            logger.error("SQL Error: ", err);
            sqlRes = {
                "success": false,
                "message": err.message
            };
            cb(sqlRes)
        } else {
            logger.debug("SQL call successful. Result: ", this.lastID);
            sqlRes = {
                "success": true,
                "message": this.lastID,
            };
            cb(sqlRes);
        }
    })
    db.close
    }
}

async function updateData(sqlStatement,params,cb) {
    let sqlData;
    if (params != null) {
        db.run(sqlStatement,params,function (err)  {
            if (err) {
                logger.error("SQL Error: ", err);
                sqlData = {
                    "success": false,
                    "message": err.message
                };
                cb(sqlData)
            } else {
                logger.debug("SQL call successful. Row(s) updated: ", this.changes);
                sqlData = {
                    "success": true,
                    "message": `Row(s) updated: ${this.changes}`,
                };
                cb(sqlData);
            }
        })
        db.close
    }

}

async function getData(sqlStatement,params,cb) {
    let sqlRes;
    if (params != null) {
        db.all(sqlStatement, params, function (err, rows) {
            if (err) {
                logger.error("SQL Error: ", err);
                sqlRes = {
                    "success": false,
                    "message": err.message
                };
                cb(sqlRes);
            } else {
                logger.debug("SQL call successful. Result: ", rows);
                sqlRes = {
                    "success": true,
                    "message": rows
                };
                cb(sqlRes);
            }
        })
        db.close
    }
}

async function getDataBy(sqlStatement,params,cb) {
    let sqlRes;
    if (params != null) {
    db.get(sqlStatement,params,function (err,row) {
        if (err) {
            logger.error("SQL Error: ", err);
            sqlRes = {
                "success": false,
                "message": err.message
            };
            cb(sqlRes);
        } else {
            logger.debug("SQL call successful. Result: ", row);
            sqlRes = {
                "success": true,
                "message":row
            };
            cb(sqlRes);
        }
    })
    db.close
    }
}

async function deleteRow(sqlStatement,params,cb) {
    let sqlRes;
    if (params != null) {
        db.run(sqlStatement,params,function (err)  {
            if (err) {
                logger.error("SQL Error: ", err);
                sqlRes = {
                    "success": false,
                    "message": err.message
                };
                cb(sqlRes)
            } else {
                logger.debug(`Row(s) deleted ${this.changes}`);
                sqlRes = {
                    "success": true,
                    "message": this.changes,
                };
                cb(sqlRes);
            }
        })
        db.close
    }
}

module.exports = {insertData,updateData,getData,getDataBy,deleteRow};
