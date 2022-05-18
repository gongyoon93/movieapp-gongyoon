const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    log: {
        type: String,
        maxLength: 50
    },
});

const Log = mongoose.model('Log', logSchema);

module.exports = {
    Log
};