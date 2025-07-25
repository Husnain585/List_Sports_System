const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    path: {
        type: String,
        require : true
    },
    filename : {
        type: String,
        require : true
    },
});
const Image = mongoose.model('images', imageSchema);
module.exports = Image;