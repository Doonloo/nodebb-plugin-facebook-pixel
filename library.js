"use strict";

const async = require("async");
const meta = require.main.require("./src/meta");

const controllers = require("./lib/controllers");

const FacebookPixel = {};

FacebookPixel.init = function(params, callback) {
  const router = params.router;
  const hostMiddleware = params.middleware;

  router.get(
    "/admin/plugins/facebook-pixel",
    hostMiddleware.admin.buildHeader,
    controllers.renderAdminPage
  );

  router.get("/api/admin/plugins/facebook-pixel", controllers.renderAdminPage);

  callback();
};

FacebookPixel.onConfigGet = function(config, callback) {
  async.waterfall(
    [
      function(next) {
        meta.settings.get("facebook-pixel", next);
      },
      function(settings, next) {
        config.facebookPixel = settings;
        next(null, config);
      }
    ],
    callback
  );
};

FacebookPixel.activate = function(data) {
  if (data.id === "nodebb-plugin-facebook-pixel") {
    meta.settings.setOnEmpty("facebook-pixel", "facebook_pixel_id", "");
  }
};

FacebookPixel.addAdminNavigation = function(header, callback) {
  header.plugins.push({
    route: "/plugins/facebook-pixel",
    icon: "fa-facebook",
    name: "Facebook Pixel"
  });

  callback(null, header);
};

module.exports = FacebookPixel;
