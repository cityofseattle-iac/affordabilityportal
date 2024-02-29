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

(async () => {

    // if (process.env.NODE_ENV != 'production') {
    //     server.use(basicAuth({
    //         users: { 'seattle': 'expedia' },
    //         challenge: true,
    //     }))
    // }
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

    // server.get('/program-info/:id', (req, res) => {
    //     const {query, params} = req;
    //     return app.render(req, res, '/program-info', {
    //         ...query, id: params.id
    //     })
    // });

    // server.get('*', (req, res) => handle(req, res));

    server.use((req, res, next) => {
        switch (req.originalUrl) {
            case '/program-info/11-seattle-parks-and-recreation-before-or-after-school-care':
                res.redirect(301, 'https://www.seattle.gov/parks/scholarships-and-financial-aid');
                break;
    
            case '/program-info/12-seattle-parks-and-recreation-preschool-scholarships':
                res.redirect(301, 'https://www.seattle.gov/parks/scholarships-and-financial-aid');
                break;
    
            case '/program-info/13-seattle-preschool-program':
                res.redirect(301, 'https://www.seattle.gov/education/for-parents/child-care-and-preschool/seattle-preschool-program');
                break;
    
            case '/program-info/14-seattle-promise':
                res.redirect(301, 'https://www.seattlecolleges.edu/promise');
                break;
    
            case '/program-info/15-child-care-assistance-program':
                res.redirect(301, 'https://www.seattle.gov/education/for-parents/child-care-and-preschool/child-care-assistance-program');
                break;
    
            case '/program-info/16-pathway-preschool-program':
                res.redirect(301, 'https://www.seattle.gov/education/for-parents/child-care-and-preschool/pathway-to-seattle-preschool-program');
                break;
    
            case '/program-info/17-parks-and-recreation-summer-camps':
                res.redirect(301, 'https://www.seattle.gov/parks/scholarships-and-financial-aid');
                break;
    
            case '/program-info/1-fresh-bucks-match':
                res.redirect(301, 'https://www.seattlefreshbucks.org/how-it-works/');
                break;
    
            case '/program-info/2-fresh-bucks-vouchers':
                res.redirect(301, 'https://www.seattlefreshbucks.org/');
                break;
    
            case '/program-info/29-FLASH-Card':
                res.redirect(301, 'https://www.seattle.gov/agefriendly/programs/discounts');
                break;
    
            case '/program-info/30-Gold-Card':
                res.redirect(301, 'https://www.seattle.gov/agefriendly/programs/discounts');
                break;
    
            case '/program-info/3-orca-lift':
                res.redirect(301, 'https://reducedfare.kingcounty.gov/en-US/');
                break;
    
            case '/program-info/5-orca-youth-card':
                res.redirect(301, 'https://kingcounty.gov/depts/transportation/metro/fares-orca/orca-cards/youth.aspx');
                break;
    
            case '/program-info/7-restricted-parking-zone-permit':
                res.redirect(301, 'https://www.seattle.gov/transportation/permits-and-services/permits/parking-permits/rpz-permits/restricted-parking-zone-(rpz)-permit-discount');
                break;
    
            case '/program-info/20-orca-opportunity-seattle-promise-scholars':
                res.redirect(301, 'https://www.seattle.gov/transportation/projects-and-programs/programs/transportation-access-programs/seattle-promise');
                break;
    
            case '/program-info/21-orca-opportunity-seattle-housing-authority-residents':
                res.redirect(301, 'https://www.seattle.gov/transportation/projects-and-programs/programs/transportation-access-programs/orca-cards-for-sha-tenants');
                break;
    
            case '/program-info/8-utility-discount-program':
                res.redirect(301, 'https://www.seattle.gov/human-services/services-and-programs/utility-discount-program');
                break;
    
            case '/program-info/9-astound-simply-internet':
                res.redirect(301, 'https://www.seattle.gov/tech/internet-and-devices/free-and-discounted-internet');
                break;
    
            case '/program-info/10-internet-essentials-from-comcast':
                res.redirect(301, 'https://www.seattle.gov/tech/tv-and-video/discounted-cable-tv');
                break;
    
            case '/program-info/18-SPU-free-toilet-program':
                res.redirect(301, 'https://www.seattle.gov/utilities/protecting-our-environment/sustainability-tips/conserve-water/free-toilets-for-homeowners');
                break;
    
            case '/program-info/22-interconnection':
                res.redirect(301, 'https://connectall.org/');
                break;
    
            case '/program-info/23-pcs-for-people':
                res.redirect(301, 'https://www.seattle.gov/tech/internet-and-devices/discounted-computers-and-phones');
                break;
    
            case '/program-info/24-Emergency-Bill-Assistance':
                res.redirect(301, 'https://www.seattle.gov/city-light/residential-services/billing-information/bill-assistance-programs');
                break;
    
            case '/program-info/25-Emergency-Assistance-Program':
                res.redirect(301, 'https://www.seattle.gov/utilities/your-services/discounts-and-incentives/emergency-assistance-program');
                break;
    
            case '/program-info/26-Side-Sewer-Assistance-Program':
                res.redirect(301, 'https://www.seattle.gov/housing/homeowners/home-repair/side-sewer-assistance-program');
                break;
    
            case '/program-info/27-Home-Repair':
                res.redirect(301, 'https://www.seattle.gov/housing/homeowners/home-repair');
                break;
    
            case '/program-info/28-Weatherization':
                res.redirect(301, 'https://www.seattle.gov/housing/homeowners/weatherization');
                break;
    
            case '/program-info/31-trees-for-neighborhoods':
                res.redirect(301, 'https://www.seattle.gov/trees/planting-and-care/trees-for-neighborhoods');
                break;
    
            case '/program-info/32-smoke-and-carbon-monoxide-alarms':
                res.redirect(301, 'https://www.seattle.gov/fire/safety-and-community/smoke-and-carbon-monoxide-alarms');
                break;
    
            case '/program-info/33-rain-wise':
                res.redirect(301, 'https://700milliongallons.org/rainwise/');
                break;
    
            default:
                res.redirect(301, 'https://www.seattle.gov/assistance-and-discounts');
                break;
        }
    
        next();
    })

    await app.prepare();

})();

module.exports = server;