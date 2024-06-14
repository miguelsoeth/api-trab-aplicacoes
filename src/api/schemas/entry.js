const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    type: String,
    categories: String,
    description: String,
    value: String,
    due_date: Date,
    status: String,
    account: String,
    comments: String,
    payment_date: Date
});
  
const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
