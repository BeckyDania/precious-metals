const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const metalSchema = new Schema({
    name:  { type: String, required: true },
    form:  { type: String, required: true },
    weight:  { type: Number, required: true },
    price:  { type: Number },
    quantity: { type: Number, required: true},
	description:{ type: String, required: true },
    image: {type: String }
});

const Metal = model('Metal', metalSchema);

module.exports = Metal;