const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    address: String,
    privateKey: String,
    mnemonic: String,
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;