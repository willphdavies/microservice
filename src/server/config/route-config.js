(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/routes.index');
    const userRoutes = require('../routes/routes.users');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/api/v1/users', userRoutes);

  };

})(module.exports);
