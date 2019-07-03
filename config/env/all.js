const path = require('path');

const rootPath = path.normalize(`${__dirname}/../..`);

module.exports = {
  appName: 'iac-web',
  root: rootPath,
  port: process.env.PORT || 8080,
  https: {
    enabled: false,
    port: process.env.TLS_PORT || 8443,
    key: `${rootPath}/certs/ssl-key-np.pem`,
    cert: `${rootPath}/certs/ssl-cert.pem`
  },
  accessLog: {
    fileSize: '1m',
    keep: 10,
    compress: true
  },
  isAWSEnvironment: false,
  preferClusterMode: true
};
