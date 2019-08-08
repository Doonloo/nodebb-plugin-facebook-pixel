"use strict";

const Controllers = {};

Controllers.renderAdminPage = function(req, res) {
  res.render("admin/facebook-pixel", {});
};

module.exports = Controllers;
