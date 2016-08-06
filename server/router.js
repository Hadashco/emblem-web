var userRouter = require('./resources/user/userRoute');
var placeRouter = require('./resources/place/placeRoute');
var artRouter = require('./resources/art/artRoute');

module.exports = function(app) {
  app.use('/user', userRouter);
  app.use('/place', placeRouter);
  app.use('/art', artRouter);
};
