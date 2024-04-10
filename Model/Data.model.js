const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    task: String,
    description: String
},{
    versionKey:true
});

const DataModel = mongoose.model('task', dataSchema);

module.exports = {
    DataModel
}
