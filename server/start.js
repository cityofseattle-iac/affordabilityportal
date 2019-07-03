const server = require('./server');
const config = require('../config/config');
const Cluster = require('./cluster');
const cluster = new Cluster(server);

if (config.preferClusterMode) {
  cluster.startInClusterMode();
} else {
  cluster.startInStandaloneMode();
}
