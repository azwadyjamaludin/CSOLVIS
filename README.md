# CSOLVIS

#### Setup Instructions

This instructions assumes you are in the `CSOLVIS` directory. If not please launch command prompt / terminal and cd to it.
`CSOLVIS` deploys a document base `SQLite` database embedded in server directory. Pre-installed `SQLite` is not required.

Below instruction is base on terminal shell (CLI). Please deploy the appropriate CLI command for other CLI. Then git clone this repo to local machine. Client directory is implementing React.js framework and needs to build and copy paste to server in order to run as full stack apps.

1. Install NPM packages (server).
 - `cd server`
 - `npm install`

2. Install NPM packages (client).
- `cd client`
- `npm install`

3. Run CSOLVIS (server).
 - `Run server = cd server && npm run dev (dev mode)`
 - `Run server = cd server && node index.js (production mode)`

4. Run CSOLVIS (client).
- `Run client = cd client && npm run start`

 
5. Run CSOLVIS's Full Stack
- `To run full stack. Build client directory (npm run build). Copy and paste the generated build folder to server directory (cp -r build ../server)` 
- `Change directory to server (cd server)`
- `Rename the build folder to views and run index.js (mv build views && node index.js)` 

