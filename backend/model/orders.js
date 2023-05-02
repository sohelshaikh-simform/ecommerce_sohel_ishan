const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: {type: String, require: true}
});

module.exports = mongoose.model("order", orderSchema);