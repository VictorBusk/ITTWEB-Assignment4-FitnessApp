const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true});
require('./models/exercise');
require('./models/workout');
require('./models/user');
