const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('../../logging/logger').withIdentifier('routes:build-info');

const BUILD_INFO_FILE_PATH = '../../config/build-info.js';

let buildInfo;
if (fs.existsSync(path.join(__dirname, BUILD_INFO_FILE_PATH))) {
  // eslint-disable-next-line
  buildInfo = require(BUILD_INFO_FILE_PATH);
} else {
  logger.warn('Build Info file not found, and hence not set up to inform actual version of the app.');
  buildInfo = { version: 'unknown' };
}

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200)
    .type('json')
    .send(buildInfo);
});

module.exports = router;
