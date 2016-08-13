const userRouter = require('./resources/user/userRoute');
const placeRouter = require('./resources/place/placeRoute');
const artRouter = require('./resources/art/artRoute');
const authRouter = require('./auth/authRoute');
const isAuthenticated = require('./auth/authService').isAuthenticated;
// TODO: Add login / logout path

module.exports = (app) => {
  app.use('/user', isAuthenticated(), userRouter);
  app.use('/place', isAuthenticated(), placeRouter);
  app.use('/art', isAuthenticated(), artRouter);
  app.use('/auth', authRouter);
};
