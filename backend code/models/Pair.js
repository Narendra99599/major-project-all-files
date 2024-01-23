const mongoose = require('mongoose');

const PairSchema = new mongoose.Schema({
    question : {
        type : String,
        required : true,
    },
    answer : {
        type : String,
        required : true,
    }
})

module.exports.Pair = mongoose.model("Pair", PairSchema);