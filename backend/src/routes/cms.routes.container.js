const homeSlidesRoutes = require('./cms/home_slides.routes');
const singlePageRoutes = require('./cms/single_page.routes');

/**
 * The `class CmsRoutes` is defining a class in JavaScript.
 * This class has a constructor that takes two parameters `app`
 * and `verifyToken`.
 *
 * @class
 * @name CmsRoutes
 * @kind class
 */
class CmsRoutes {
  /**
   *
   * @constructor
   * @name CmsRoutes
   * @param {express} app
   * @param {middleware} verifyToken
   */
  constructor(app, verifyToken) {
    this.app = app;
    this.verifyToken = verifyToken;
  }

  /**
   *
   * @method
   * @name homeSlides
   * @kind property
   * @memberof CmsRoutes
   * @returns {void}
   */
  homeSlides = () => {
    this.app.use('/api/cms/homeslides', this.verifyToken, homeSlidesRoutes);
  };

  /**
   *
   * @method
   * @name singlePage
   * @kind property
   * @memberof CmsRoutes
   * @returns {void}
   */
  singlePage = () => {
    this.app.use('/api/cms/singlepage', this.verifyToken, singlePageRoutes);
  };

  enable = () => {
    this.homeSlides();
    this.singlePage();
  };
}

module.exports = CmsRoutes;
