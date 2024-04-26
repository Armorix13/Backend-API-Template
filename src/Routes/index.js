const express = require('express');
const router = express.Router();
const docsRoute = require('./swagger.route');
const userRoutes = require('./user.routes');

const defaultRoutes = [
  {
    path: '/users',
    route: userRoutes, // User routes
  },
];

// Register each route module using its corresponding path
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

const devIRoute = [
  // IRoute available only in development mode
  {
    path: '/api-docs',
    route: docsRoute,
  },
];

devIRoute.forEach((route) => {

  router.use(route.path, route.route);
});

module.exports = router;