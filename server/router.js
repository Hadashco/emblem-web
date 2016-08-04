var userRouter = require('./resources/user/userRoute');
var placeRouter = require('./resources/place/placeRoute');


module.exports = function(app) {
  app.use('/user', userRouter);
  app.use('/place', placeRouter);
};
