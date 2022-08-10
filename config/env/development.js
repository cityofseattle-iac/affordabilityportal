module.exports = {
  environmentName: 'Development',
  preferClusterMode: false,
  statsd: {
    host: 'statsd-dev',
    port: 8125,
    path: 'iac-web'
  },
  apiHost: 'http://wwwqa.seattle.gov',
  imagePath: 'http://wwwqa.seattle.gov'
};
