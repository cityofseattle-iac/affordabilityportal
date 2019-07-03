module.exports = {
  environmentName: 'Production',
  isAWSEnvironment: true,
  https: {
    enabled: false
  },
  statsd: {
    host: 'statsd',
    port: 8125,
    path: 'iac-web'
  }
};
