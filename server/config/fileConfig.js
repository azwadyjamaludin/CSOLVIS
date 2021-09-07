const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const {spawn} = require('child_process')
let logger = log4js.getLogger('fileConfig.js')
let multer = require('multer');

let uploadPathUser = ''; let uploadPathUserNormalise = ''; let uploadPathUserLog; let uploadPathUserLogNormalise
uploadPathUser = path.join(__dirname, '../files/saveFile');
uploadPathUserLog = path.join(__dirname, '../files/logs/');
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
    let filePath = request.body.filePath; let sessID = request.body.sessionID
    logger.debug('compileSource:', filePath)

    let childProcess = spawn('clang', [filePath, '-o', filePath.replace('.c', '')]);
    fs.createWriteStream(`${uploadPathUserLogNormalise}${sessID}+cmdX.log`)

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

async function compileProcess2(request,response) {
    let filePath = request.body.filePath; let sessID = request.body.sessionID
    logger.debug('compileSourceForDebug:', filePath)

    let childProcess = spawn('clang', ['-g',filePath, '-o', filePath.replace('.c', '-2')]);
    fs.createWriteStream(`${uploadPathUserLogNormalise}${sessID}+cmdD.log`)

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

async function executeProcess(socket) {
    let filePath = socket.handshake.query.filePath; let sesID = socket.handshake.query.sesID;
    logger.debug('executeProcess:', filePath, 'sesID:',sesID)

    let childProcess = spawn('lldb', [`${filePath.replace('.c','')}`]);
    let readLog = fs.readFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdX.log`)
    let data = '';

    process.stdin.pipe(childProcess.stdin)

    childProcess.stdin.write(`run\n`)
    childProcess.stdout.on('data', function (chunk) {
        data += chunk
        socket.emit('stdout',data)
    })
    childProcess.stderr.on('data', function (err)  {
        data += err
        socket.emit('stderr',data)
    })
    socket.on('cmd', function (cmd) {
        fs.appendFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdX.log`, `${cmd}\n`)
        childProcess.stdin.write(`${readLog.toString()}`)
        childProcess.stdout.on('data', function (chunk) {
            data += chunk
            socket.emit('stdout',data)
        })
        childProcess.stderr.on('data', function (err)  {
            data += err
            socket.emit('stderr',data)
        })
    })
    childProcess.on('close', (code) => {
        logger.debug(`process exited with code ${code}`)
    });
}

async function debugProcess(socket) {
    let filePath = socket.handshake.query.filePath; let sesID = socket.handshake.query.sesID;
    logger.debug('debugProcess:', filePath, 'sesID:',sesID)

    let childProcess = spawn('lldb', [`${filePath.replace('.c', '-2')}`]);
    let readLog= fs.readFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdD.log`)
    let data = '';

    process.stdin.pipe(childProcess.stdin)

    childProcess.stdin.write(`breakpoint set --name main\n continue\n`)
    childProcess.stdout.on('data', function(chunk)  {
        data += chunk
        socket.emit('stdout' ,data)
    })
    childProcess.stderr.on('data', (err) => {
        data += err
        socket.emit('stderr' ,data)
    })
    socket.on('cmd', function (cmd) {
        fs.appendFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdD.log`,`${cmd}\n`)
        childProcess.stdin.write(`${readLog.toString()}`)
        childProcess.stdout.on('data', function(chunk)  {
            data += chunk
            socket.emit('stdout' ,data)
        })
        childProcess.stderr.on('data', (err) => {
            data += err
            socket.emit('stderr' ,data)
        })
    })
    childProcess.on('close', (code) => {
        logger.debug(`process exited with code ${code}`)
    });
}
module.exports = {uploadConfig,compileProcess,compileProcess2,executeProcess,debugProcess,uploadPathUserLogNormalise}
