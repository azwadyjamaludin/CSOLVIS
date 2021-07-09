let express = require('express');
let bodyParser = require('body-parser');
let log4js = require('log4js');
let dotenv = require('dotenv') ;
let path = require('path');
let cors = require('cors')
let http = require('http');

const host = process.env.APPREST_HOST || 'localhost';
const port = process.env.APPREST_PORT || 3002;


let logger = log4js.getLogger('server.js')
let myapp = express()
let FileMgtRoute = require('./routes/fileMgt-route')
let fileConfig = require('./config/fileConfig.js')
let FMR = '/routes/fileMgt'
let DataMgtRoute = require('./routes/dataMgt-route')
let DMR = '/routes/dataMgt'


async function main(fn) {
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
        logger.info('****************** C SOLVIS FULLSTACK SERVER STARTED **********************');
        logger.info('***********************   http://%s:%s   *************************',
            host,
            port
        );
        logger.info('---------------------------------------------------------------------------');
    }

    let server = http.createServer(myapp).listen(port, cb);
    server.timeout = 240000;

  let io = require('socket.io')(server,{cors:{origins:'*',methods:['GET','POST']}});

    let myExecute = io.of('/executeSourceFile')
        myExecute.on('connection', client => {

                let filePath = client.handshake.query.filePath;
                logger.debug('executeSourceFile: ',filePath)
                let execute = fileConfig.spawn(`${filePath.replace('.c','')}`)

                let data = '';
                process.stdin.pipe(execute.stdin)

                execute.stdout.on('data',function(chunk)  {
                    data += chunk
                        myExecute.emit('data', `${data}`);
                    client.on('typing',(socket,next) => {
                        next()
                        myExecute.emit('data', `${data}`);
                    })
                });
                execute.on('error',(err) => {
                        myExecute.emit('data', err);
                })
                execute.on('close', (code) => {
                        myExecute.emit('data', `\n process exited with code ${code}`);
                })
            })
    let myDebug = io.of('/debugSourceFile')
        myDebug.on('connection', client => {

            let filePath = client.handshake.query.filePath;
            logger.debug('debugSourceFile: ',filePath)
            let debug =  fileConfig.spawn(`lldb`,[`${filePath.replace('.c','')}`]);

            let debugData = '';

            process.stdin.pipe(debug.stdin)
            debug.stdin.write('b -l2\n run\n')

            debug.stdout.on('data',function(chunk)  {
                debugData += chunk
                    myDebug.emit('data', `${debugData}`);
                client.on('typing',(args,next) => {
                    next()
                    myDebug.emit('data', `${debugData}`);
                })
            })
            debug.on('error',(err) => {
                    myDebug.emit('data', err);
            })
            debug.on('close', (code) => {
                    myDebug.emit('data', `\n process exited with code :${code}`);
            });
        })
}

// Running main
(async () => {
    await main();
    logger.info('Ready to serve ...');
})().catch(err => {
    logger.info('error occurred in main!');
    logger.info(err.message);
});


