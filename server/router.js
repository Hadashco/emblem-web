const userRouter = require('./resources/user/userRoute');
const placeRouter = require('./resources/place/placeRoute');
const artRouter = require('./resources/art/artRoute');
const authRouter = require('./auth/authRoute');
const artRouter = require('./resources/art/artRoute');
// TODO: Add login / logout path

module.exports = (app) => {
  app.use('/user', userRouter);
  app.use('/place', placeRouter);
  app.use('/art', artRouter);
  app.use('/auth', authRouter);
};
