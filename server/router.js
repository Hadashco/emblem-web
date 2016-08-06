const userRouter = require('./resources/user/userRoute');
const placeRouter = require('./resources/place/placeRoute');
const artRouter = require('./resources/art/artRoute');

module.exports = (app) => {
  app.use('/user', userRouter);
  app.use('/place', placeRouter);
  app.use('/art', artRouter);
};
