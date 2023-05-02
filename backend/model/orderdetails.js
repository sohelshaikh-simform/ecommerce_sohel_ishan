const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "user"},
    products: [{
        p_id: {type: mongoose.Schema.Types.ObjectId, ref: "product"},
        ordered_quantity: {type: Number}
    }]
});

module.exports = mongoose.model("orderDetail", orderSchema);