const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const metalSchema = new Schema({
    name:  { type: String},
    form:  { type: String},
    weight:  { type: Number},
    price:  { type: Number },
    quantity: { type: Number },
	description:{ type: String },
    image: {type: String }
});




const Metal = model('Metal', metalSchema);

module.exports = Metal;