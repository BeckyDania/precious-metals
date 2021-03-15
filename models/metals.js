const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const metalSchema = new Schema({
    name:  { type: String, required: true },
    form:  { type: String, required: true },
    weight:  { type: Number, required: true },
    price:  { type: Number },
	description:{ type: String, required: true }
});

const Metal = model('Metal', metalSchema);

module.exports = Metal;