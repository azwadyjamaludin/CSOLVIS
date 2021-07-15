const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const {spawn} = require('child_process')
let logger = log4js.getLogger('fileConfig.js')
let multer = require('multer');

let uploadPathUser = ''; let uploadPathUserNormalise = ''
uploadPathUser = path.join(__dirname, '../files/saveFile');
uploadPathUserNormalise = path.normalize(uploadPathUser)
logger.debug(uploadPathUserNormalise)

if (!fs.existsSync(uploadPathUserNormalise)) {
    fs.mkdirSync(uploadPathUserNormalise)
}

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


async function compileProcess(cmd,args,opt,path,callback) {
    let chunkFile = fs.createWriteStream(path + '-process.log');
    let childProcess = spawn(cmd, args, opt);

    childProcess.stdout.on('data', (data) => {
        chunkFile.write(`stdout:${data}`)
    })
    childProcess.stderr.on('data', (data) => {
        chunkFile.write(`stderr: ${data}`)
    })
    childProcess.on('close', (code) => {
        chunkFile.end(`process exited with code ${code}`)
        callback('process ended')
    });
}

async function executeProcess(cmd,args,opt,path,callback) {
    let chunkFile = fs.createWriteStream(path + '-process.log');
    let childProcess = spawn(cmd, args, opt);

    childProcess.stdin.pipe(chunkFile)
    childProcess.stdin.write(`run\n`)

    childProcess.stdout.on('data', (data) => {
        chunkFile.write(`stdout:${data}`)
        callback('callback')
    })
    childProcess.stderr.on('data', (data) => {
        chunkFile.write(`stderr: ${data}`)
    })
    childProcess.on('close', (code) => {
        if (code !== 0) {
            chunkFile.end(`process exited with code ${code}`);
            callback('process ended')
        }
        else {
            chunkFile.end()
            callback('process ended')
        }
    });
}

async function debugProcess(cmd,args,opt,path,callback) {
    let chunkFile = fs.createWriteStream(path + '-process.log');
    let childProcess = spawn(cmd, args, opt);

    childProcess.stdin.pipe(chunkFile)
    childProcess.stdin.write(`b main\n run\n`)

    childProcess.stdout.on('data', (data) => {
        chunkFile.write(`stdout:${data}`)
        callback('callback')
    })
    childProcess.stderr.on('data', (data) => {
        chunkFile.write(`stderr:${data}`)
    })
    childProcess.on('close', (code) => {
        if (code !== 0) {
            chunkFile.end(`process exited with code ${code}`);
            callback('process ended')
        }
        else {
            chunkFile.end()
            callback('process ended')
        }
    });
}
module.exports = {uploadConfig,compileProcess,executeProcess,debugProcess,spawn}
