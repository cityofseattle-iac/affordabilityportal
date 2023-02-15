module.exports = {
  environmentName: 'Development',
  preferClusterMode: false,
  statsd: {
    host: 'statsd-dev',
    port: 8125,
    path: 'iac-web'
  },
  apiHost: 'https://wwwqa.seattle.gov',
  imagePath: 'https://wwwqa.seattle.gov'
};
