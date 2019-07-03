const routes = require('next-routes');

// Name   Page      Pattern
module.exports = routes()
    .add({name: 'robots', pattern: '/robots.txt', page: 'robots'})
    .add({name: 'sitemap', pattern: '/sitemap.xml', page: 'sitemap'})
    .add({name: 'buildInfo', pattern: '/buildInfo', page: 'buildInfo'})
    .add({name: 'isActive', pattern: '/isActive', page: 'isActive'})
    .add({name: 'home', pattern: '/', page: 'index'})
    .add({name: 'eligiblePrograms', pattern: '/eligible-programs', page: 'eligible-programs'})
    .add({name: 'programInfo', pattern: '/program-info/:id', page: 'program-info'});
