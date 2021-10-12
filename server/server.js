let express = require('express');
let bodyParser = require('body-parser');
let log4js = require('log4js');
let dotenv = require('dotenv') ;
let path = require('path');
let http = require('http');
let cors = require('cors')

const host = process.env.APPREST_HOST || 'localhost';
const port = process.env.APPREST_PORT || 3002;
const fs = require('fs');

let logger = log4js.getLogger('server.js')
let myapp = express()
let FMR = '/routes/fileMgt'
let DataMgtRoute = require('./routes/dataMgt-route')
let FileMgtRoute = require('./routes/fileMgt-route')
let FileConfig = require('./config/fileConfig')
let DMR = '/routes/dataMgt'

async function main() {
    dotenv.config();
    myapp.use(bodyParser.json());
    myapp.use(bodyParser.urlencoded({
        extended: true
    }));
    //allow cors
    myapp.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    //API
    myapp.use(FMR, FileMgtRoute)
    myapp.use(DMR,DataMgtRoute)
    myapp.use('/be', (req, res) => {
        res.json({
            message: "Welcome to C SOLVIS back end."
        });
    });

    myapp.use(express.static(path.join(__dirname, 'views')))
    myapp.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'views', 'index.html'))
    })

    const cb = () => {
        logger.debug('---------------------------------------------------------------------------');
        logger.debug('****************** C SOLVIS FULLSTACK SERVER STARTED **********************');
        logger.debug('***********************   http://%s:%s   *************************',
            host,
            port
        );
        logger.debug('---------------------------------------------------------------------------');
    }

    let server = http.createServer(myapp);
    server.timeout = 240000;

    const { Server } = require("socket.io");
    const io = new Server(server,{cors:{origins:'*',methods:['GET','POST']}});

    let myExecute = io.of('/executeProcess')
    myExecute.on('connection', socket => {
        FileConfig.executeProcess(socket)
    })
    /*let myExecuteCmd = io.of('/executeProcessCmd')
    myExecuteCmd.on('connection', socket => {
        FileConfig.executeProcess(socket)
    })*/

    let myDebug = io.of('/debugProcess')
    myDebug.on('connection', socket => {
        FileConfig.debugProcess(socket)
    })
    let myDebugCmd = io.of('/debugProcessCmd')
    myDebugCmd.on('connection', socket => {
        FileConfig.debugProcess(socket)
    })

    server.listen(port, cb)
}

// Running main
(async () => {
    await main();
    logger.debug('Ready to serve ...');
})().catch(err => {
    logger.error('error occurred in main!');
    logger.error(err.message);
});


