let express = require('express');
let bodyParser = require('body-parser');
let log4js = require('log4js');
let dotenv = require('dotenv') ;
let path = require('path');
let http = require('http');

const host = process.env.APPREST_HOST || 'localhost';
const port = process.env.APPREST_PORT || 3000;

let logger = log4js.getLogger('server.js')
let myapp = express()
let FMR = '/routes/fileMgt'
let DataMgtRoute = require('./routes/dataMgt-route')
let FileMgtRoute = require('./routes/fileMgt-route')
const FileConfig = require("./config/fileConfig");
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
        logger.info('---------------------------------------------------------------------------');
        logger.info('****************** C SOLVIS DESKTOP APP SERVER STARTED *******************');
        logger.info('***********************   http://%s:%s   *************************',
            host,
            port
        );
        logger.info('---------------------------------------------------------------------------');
    }

    let server = http.createServer(myapp);
    server.timeout = 240000;

    let io = require('socket.io')(server,{cors:{origins:'*',methods:['GET','POST']}});

    let myExecute1 = io.of('/initialExecuteProcess')
    myExecute1.setMaxListeners(0)
    myExecute1.on('connection', socket => {
        FileConfig.initialExecuteProcess(socket)
    })
    myExecute1.on('forceDisconnect', function () {
        myExecute1.disconnect()
    })

    let myExecute2 = io.of('/executeProcess')
    myExecute2.setMaxListeners(0)
    myExecute2.on('connection', socket => {
        FileConfig.executeProcess(socket)
    })
    myExecute2.on('forceDisconnect', function () {
        myExecute2.disconnect()
    })

    let myDebug1 = io.of('/initialDebugProcess')
    myDebug1.setMaxListeners(0)
    myDebug1.on('connection', socket => {
        FileConfig.initialDebugProcess(socket)
    })
    myDebug1.on('forceDisconnect', function () {
        myDebug1.disconnect()
    })

    let myDebug2 = io.of('/debugProcess')
    myDebug2.setMaxListeners(0)
    myDebug2.on('connection', socket => {
        FileConfig.debugProcess(socket)
    })
    myDebug2.on('forceDisconnect', function (socket) {
        myDebug2.disconnect()
    })

    server.listen(port, cb)
}

// Running main
(async () => {
    await main();
    logger.info('Ready to serve ...');
})().catch(err => {
    logger.info('error occurred in main!');
    logger.info(err.message);
});


