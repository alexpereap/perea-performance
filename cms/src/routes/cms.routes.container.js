const backendAuth = require('../middlewares/backend.auth.middleware');
const cmsRoutes = require('./cms.routes');

class CmsRoutesContainer {
  constructor(app) {
    this.app = app;
  }

  enableCms = () => this.app.use('/cms', backendAuth, cmsRoutes);
}

module.exports = CmsRoutesContainer;
