const mongoose = require('mongoose');

const accountsSchema = new mongoose.Schema({
    description: String,
    comments: String
});
  
const Account = mongoose.model('Account', accountsSchema);

module.exports = Account;
