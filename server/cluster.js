const OS = require('os');
const cluster = require('cluster');
const logger = require('../logging/logger').withIdentifier('server');
const https = require('https');
const fs = require('fs');

class Cluster {
    constructor(expressApp) {
        this.expressApp = expressApp;
    }

    startInStandaloneMode() {
        const activeApp = this.expressApp;
        const port = this.expressApp.get('port');
        const httpsConfig = this.expressApp.get('https');

        if (httpsConfig.enabled) {
            https.createServer({
                key: fs.readFileSync(httpsConfig.key),
                cert: fs.readFileSync(httpsConfig.cert)
            }, activeApp)
                .listen(httpsConfig.port, () => logger.info(`Express server listening with TLS: ${httpsConfig.port}`));
        } else {
            activeApp
                .listen(port, () => logger.info(`Express server listening: ${port}`));
        }
    }

    startInClusterMode() {
        const cpuCount = OS.cpus().length;
        if (cpuCount < 2) {
            this.startInStandaloneMode();
        } else if (cluster.isMaster) {
            logger.info(`Launching in cluster mode across ${cpuCount} CPUs`);
            for (let i = 0; i < cpuCount; i += 1) {
                cluster.fork();
            }
            cluster.on('exit', (worker) => {
                logger.info(`Worker ${worker.id} exited. Launching again...`);
                cluster.fork();
            });
            cluster.on('listening', (worker, address) => {
                logger.info(`Worker ${worker.id} is now connected to ${address.address || 'localhost'}:${address.port}`);
            });
        } else {
            this.startInStandaloneMode();
        }
    }
}

module.exports = Cluster;
