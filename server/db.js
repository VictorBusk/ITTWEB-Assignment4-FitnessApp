const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {useMongoClient: true});
require('./models/exercise');
require('./models/workout');
require('./models/user');
