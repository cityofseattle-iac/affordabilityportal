// server.js
const next = require('next');
const path = require('path');

const express = require('express');
const compression = require('compression');

const nextI18NextMiddleware = require('next-i18next/middleware');
const nextI18next = require('../localization/i18n');

const config = require('../config/config');
const logger = require('../logging/logger');

const app = next({dev: process.env.NODE_ENV != 'production'});
const handle = app.getRequestHandler();
const basicAuth = require('express-basic-auth')

const server = express();

console.log(process.env.NODE_ENV)

(async () => {

    if (process.env.NODE_ENV != 'production') {
        server.use(basicAuth({
            users: { 'seattle': 'expedia' },
            challenge: true,
        }))
    }
    // CONFIGURATIONS
    server.set('port', config.port);
    server.set('https', config.https);

    const bodyParser = require('body-parser');

    server.use(compression());
    server.use(logger.REQUEST_LOGGER);
    server.use(logger.ERROR_LOGGER);
    server.use(bodyParser.json());

    server.use(nextI18NextMiddleware(nextI18next));

    const isActiveRoute = require('./routes/is-active');
    const buildInfoRoute = require('./routes/build-info');
    const robots = require('./routes/robots');
    const sitemap = require('./routes/sitemap');

    server.use('/isActive', isActiveRoute);
    server.use('/buildInfo', buildInfoRoute);
    server.use('/robots.txt', robots);
    server.use('/sitemap.xml', sitemap);

    server.get('/program-info/:id', (req, res) => {
        const {query, params} = req;
        return app.render(req, res, '/program-info', {
            ...query, id: params.id
        })
    });

    server.get('*', (req, res) => handle(req, res));

    await app.prepare();

})();

module.exports = server;