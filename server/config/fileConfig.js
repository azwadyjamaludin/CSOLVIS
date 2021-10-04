const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const {spawn} = require('child_process');
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
    let filePath = request.body.filePath; let sessID = request.body.sessionID; let platform = process.platform
    logger.debug('compileSource:', filePath, 'platform:',platform)

    if (platform === 'darwin' || platform === 'linux') {
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
    }else if (platform === "win32") {
        let childProcess = spawn('clang', [filePath, '-o', filePath.replace('.c', '.exe')]);
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
}

async function compileProcess2(request,response) {
    let filePath = request.body.filePath; let sessID = request.body.sessionID; let platform = process.platform
    logger.debug('compileSourceForDebug:', filePath)

    if (platform === 'darwin' || platform === 'linux') {
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
  }else if (platform === "win32") {
        let childProcess = spawn('clang', ['-g',filePath, '-o', filePath.replace('.c', '-2.exe')]);
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
}

async function executeProcess(socket) {
    let filePath = socket.handshake.query.filePath; let sesID = socket.handshake.query.sesID; let platform = process.platform
    logger.debug('executeProcess:', filePath, 'sesID:',sesID)

    if (platform === 'darwin' || platform === 'linux') {
        let childProcess = spawn('lldb', [`${filePath.replace('.c', '')}`]);
        let data = '';

        process.stdin.pipe(childProcess.stdin)
        childProcess.stdin.write(`run\n`)
        socket.on('cmd', cmd => {
            if (cmd != '') {
                fs.appendFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdX.log`, `${cmd}\n`)
                let readLog = fs.readFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdX.log`)
                childProcess.stdin.write(`${readLog.toString()}`)
            }
        })
        childProcess.stdout.on('data', function (chunk) {
            data += chunk
            socket.emit('stdout', data)
        })
        childProcess.stderr.on('data', function (err) {
            data += err
            socket.emit('stderr', data)
        })
    }else if (platform === 'win32') {
        let childProcess = spawn('lldb', [`${filePath.replace('.c', '.exe')}`]);
        let data = '';

        process.stdin.pipe(childProcess.stdin)
        childProcess.stdin.write(`run\n`)
        socket.on('cmd', cmd => {
            if (cmd != '') {
                fs.appendFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdX.log`, `${cmd}\n`)
                let readLog = fs.readFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdX.log`)
                childProcess.stdin.write(`${readLog.toString()}`)
            }
        })
        childProcess.stdout.on('data', function (chunk) {
            data += chunk
            socket.emit('stdout', data)
        })
        childProcess.stderr.on('data', function (err) {
            data += err
            socket.emit('stderr', data)
        })
    }
}

async function debugProcess(socket) {
    let filePath = socket.handshake.query.filePath; let sesID = socket.handshake.query.sesID; let cmd = socket.handshake.query.cmd; let platform = process.platform
    logger.debug('debugProcess:', filePath, 'sesID:',sesID)

    if (platform === 'darwin' || platform === 'linux') {
    let childProcess = spawn('lldb', [`${filePath.replace('.c', '-2')}`]);
        let data = '';
    process.stdin.pipe(childProcess.stdin)
        if (cmd === '') {
            childProcess.stdin.write(`breakpoint set --name main\n`)
        } else if (cmd !== '') {
            fs.appendFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdD.log`,`${cmd}`)
            let readLog= fs.readFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdD.log`); let myLog = readLog.toString().split(',')
            let arrayParams = ['breakpoint set --name main']; arrayParams.concat(myLog); logger.debug('arrayParams:',arrayParams)
            for (let item in arrayParams) {
                childProcess.stdin.write(`${item}\n`)
                childProcess.stdout.on('data', function(chunk)  {
                    data += chunk
                    socket.emit('stdout' ,data)
                })
                childProcess.stderr.on('data', (err) => {
                    data += err
                    socket.emit('stderr' ,data)
                })
            }
        }
    }
    else if (platform === 'win32') {
    let childProcess = spawn('lldb', [`${filePath.replace('.c', '-2.exe')}`]);
        let data = '';
    process.stdin.pipe(childProcess.stdin)
        if (cmd === '') {
            childProcess.stdin.write(`breakpoint set --name main\n`)
        } else if (cmd !== '') {
            fs.appendFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdD.log`,`${cmd}`)
            let readLog= fs.readFileSync(`${uploadPathUserLogNormalise}${sesID}+cmdD.log`); let myLog = readLog.toString().split(',')
            let arrayParams = ['breakpoint set --name main']; arrayParams.concat(myLog);
            for (let item in arrayParams) {
                childProcess.stdin.write(`${item}\n`)
                childProcess.stdout.on('data', function(chunk)  {
                    data += chunk
                    socket.emit('stdout' ,data)
                })
                childProcess.stderr.on('data', (err) => {
                    data += err
                    socket.emit('stderr' ,data)
                })

            }
        }
    }
}
module.exports = {uploadConfig,compileProcess,compileProcess2,executeProcess,debugProcess,uploadPathUserLogNormalise}
