module.exports = {
  environmentName: 'Production',
  isAWSEnvironment: true,
  statsd: {
    host: 'statsd',
    port: 8125,
    path: 'iac-web'
  },
  apiHost: 'http://wwwqa.seattle.gov'
};
