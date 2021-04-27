let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let http = require('http');
let log4js = require('log4js');
let dotenv = require('dotenv') ;
let socketio = require('socket.io');

const host = process.env.APPREST_HOST || 'localhost';
const port = process.env.APPREST_PORT || 3000;
const path = require('path');

let logger = log4js.getLogger('server.js')
let myapp = express()
//let userAPI = require('../server/routes/api/user.js')

//let USER_API = '/api/user'


async function main() {
    dotenv.config();
    myapp.use(bodyParser.json());
    myapp.use(bodyParser.urlencoded({
        extended: true
    }));
    //app.use(express.static(path.join(__dirname, 'views')))
    myapp.use(cors());

    //API
    //app.use(USER_API, userAPI)

    myapp.use("/be", (req, res) => {
        res.json({
            message: "Welcome to C SOLVIS back end."
        });
    });

    /*app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'views', 'index.html'))
    })*/

    const cb = () => {
        logger.info('---------------------------------------------------------------------------');
        logger.info('****************** C SOLVIS BACKEND SERVER STARTED ************************');
        logger.info('******************   http://%s:%s   ********************',
            host,
            port
        );
        logger.info('---------------------------------------------------------------------------');
    }

    let server = http.createServer(myapp).listen(port, cb);
    server.timeout = 240000;

    let websocket = socketio(server);
    websocket.on('connection', async socket => {
        console.log('Client connected successfully');
        websocket.emit('chat', 'websocket connected to server');
    });
}

// Running main
(async () => {
    await main();
    logger.info('Ready to serve ...');
})().catch(err => {
    logger.info('error occurred in main!');
    logger.info(err.message);
});


