const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sequelize = require('./utils/database');
// const upload = require('./services/upload');

require('dotenv').config({path: path.join(__dirname, '.env')});

const profileRouter = require('./routes/profile');
const authRouter = require('./routes/auth');
const taskRouter = require('./routes/task');
const connectionRouter = require('./routes/connection');

const Authenticator = require('./models/authenticator');
const Chat = require('./models/chat');
const Feedback = require('./models/feedback');
const Offer = require('./models/offer');
const Profile = require('./models/profile');
const Report = require('./models/report');
const Task = require('./models/task');
const User = require('./models/user');

User.belongsTo(Authenticator, {foreignKey: 'email'});
Profile.belongsTo(User, {foreignKey: 'userId'});
User.hasMany(Task, {foreignKey: 'idVolunteer'});
User.hasMany(Task, {foreignKey: 'idReceiver'});
Feedback.hasOne(Task, {foreignKey: 'feedbackId'});
Task.hasMany(Offer, {foreignKey: 'idTask'});
User.hasMany(Feedback, {foreignKey: 'userId'});
User.hasMany(Report, {foreignKey: 'userId'});
User.hasMany(Report, {foreignKey: 'reportedUserId'});
User.hasMany(Offer, {foreignKey: 'volunteerId'});
User.hasMany(Chat, {foreignKey: 'idSender'});
User.hasMany(Chat, {foreignKey: 'idReceiver'});

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(upload.single("photoUrl"));

app.use((req, res, next) => {
  console.log("Body: ", req.body);
  next();
})

app.use(authRouter);
app.use(profileRouter);
app.use(taskRouter);
app.use(connectionRouter);

app.get('/', (req, res, next) => {
  res.render('index');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({});
  // res.render('error');
});

sequelize.sync(
  {alter: true},
  // {force: true}
)
.then(db => {
  app.listen(process.env.PORT || 3000);
})
.catch(err => {
  console.log(err);
})