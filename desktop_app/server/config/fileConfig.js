const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const {spawn} = require('child_process')
let logger = log4js.getLogger('fileConfig.js')
let multer = require('multer');

let uploadPathUser = ''; let uploadPathUserNormalise = ''; let uploadPathUserLog; let uploadPathUserLogNormalise
uploadPathUser = path.join(__dirname, '../../files/saveFile');
uploadPathUserLog = path.join(__dirname, '../../files/logs/');
uploadPathUserNormalise = path.normalize(uploadPathUser)
uploadPathUserLogNormalise = path.normalize(uploadPathUserLog)
logger.debug(uploadPathUserNormalise); logger.debug(uploadPathUserLogNormalise)

let storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        await cb(null, uploadPathUserNormalise)
    },
    filename: async function (req, file, cb) {
        await cb(null,file.originalname)
    }
})

let uploadConfig = multer({
    storage: storage
}).single('file');

async function compileProcess(request,response) {
    let filePath = request.body.filePath;
    logger.debug('compileSource:', filePath)

    let childProcess = spawn('clang', ['-g',filePath, '-o', filePath.replace('.c', '')]);

    childProcess.stdout.on('data', (data) => {
        response.write(`stdout:${data}`)
    })
    childProcess.stderr.on('data', (data) => {
        response.write(`stderr: ${data}`)
    })
    childProcess.on('close', (code) => {
        response.end(`process exited with code ${code}`)
    });
}

async function initialExecuteProcess(socket) {
    let filePath  = socket.handshake.query.filePath; let sesID = socket.handshake.query.sesID;
    logger.debug('initialExecuteProcess:', filePath)

    let childProcess = spawn('lldb', [`${filePath.replace('.c','')}`]);
    fs.createWriteStream(`${uploadPathUserLogNormalise}${sesID}+cmdX.log`)
    let data = '';

    process.stdin.pipe(childProcess.stdin)
    childProcess.stdin.write(`run\n`)

    childProcess.stdout.on('data', (chunk) => {
        data += chunk
        socket.emit('stdout' ,data)

    })
    childProcess.stderr.on('data', (err) => {
        data += err
        socket.emit('stderr' ,data)
    })
    childProcess.on('close', (code) => {
        logger.debug(`process exited with code ${code}`)
    });
}

async function executeProcess(socket) {
    let filePath = socket.handshake.query.filePath; let cmd = socket.handshake.query.command; let sesID = socket.handshake.query.sesID;
    logger.debug('executeProcess:', filePath, 'cmd:',cmd, 'sesID:',sesID)

    let childProcess = spawn('lldb', [`${filePath.replace('.c','')}`]);
    fs.appendFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdX.log`, `${cmd}\n`)
    let data = '';

    process.stdin.pipe(childProcess.stdin)
        let readLog = fs.readFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdX.log`)
        childProcess.stdin.write(`run\n ${readLog.toString()}`)

    childProcess.stdout.on('data', function (chunk) {
        data += chunk
        socket.emit('stdout',data)
    })
    childProcess.stderr.on('data', function (err)  {
        data += err
        socket.emit('stderr',data)
    })
    childProcess.on('close', (code) => {
        logger.debug(`process exited with code ${code}`)
    });
}

async function initialDebugProcess(socket) {
    let filePath  = socket.handshake.query.filePath; let sesID = socket.handshake.query.sesID;
    logger.debug('initialDebugProcess:', filePath)

    let childProcess = spawn('lldb', [`${filePath.replace('.c', '')}`]);
    fs.createWriteStream(`${uploadPathUserLogNormalise}${sesID}+cmdD.log`)
    let data = ''

    process.stdin.pipe(childProcess.stdin)
    childProcess.stdin.write(`b main\n run\n`)

    childProcess.stdout.on('data', (chunk) => {
        data += chunk
        socket.emit('stdout',data)
    })
    childProcess.stderr.on('data', function(err) {
        data += err
        socket.emit('stderr' ,data)
    })
    childProcess.on('close', (code) => {
        logger.debug(`process exited with code ${code}`)
    });
}

async function debugProcess(socket) {
    let filePath = socket.handshake.query.filePath; let cmd = socket.handshake.query.command; let sesID = socket.handshake.query.sesID;
    logger.debug('debugProcess:', filePath, 'cmd:',cmd, 'sesID:',sesID)

    let childProcess = spawn('lldb', [`${filePath.replace('.c', '')}`]);
    fs.appendFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdD.log`,`${cmd}\n`)
    let data = '';

    process.stdin.pipe(childProcess.stdin)
       let readLog= fs.readFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdD.log`)
       childProcess.stdin.write(`b main\n run\n ${readLog.toString()}`)

    childProcess.stdout.on('data', function(chunk)  {
        data += chunk
        socket.emit('stdout' ,data)
    })
    childProcess.stderr.on('data', (err) => {
        data += err
        socket.emit('stderr' ,data)
    })
    childProcess.on('close', (code) => {
        logger.debug(`process exited with code ${code}`)
    });
}
module.exports = {uploadConfig,compileProcess,initialExecuteProcess,executeProcess,initialDebugProcess,debugProcess,uploadPathUserLogNormalise}
