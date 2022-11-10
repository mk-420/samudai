const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  //route with content acessible to all
  app.get("/api/test/all", controller.allAccess);
//route with content acessible to users 
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  //route with content acessible to modereators or admins but not users 
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.moderatorBoard
  );
//route with content acessible to admins only
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  // route for access management
  app.post(
    "/api/manage/",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.accessModifier
  );
};
