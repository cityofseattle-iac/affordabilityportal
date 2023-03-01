module.exports = {
  environmentName: 'Development',
  preferClusterMode: false,
  statsd: {
    host: 'statsd-dev',
    port: 8125,
    path: 'iac-web'
  },
  apiHost: 'https://www.seattle.gov',
  imagePath: 'https://www.seattle.gov'
};
