const {Schema, model} = require('mongoose')


//email, password , avatar , posts
const userShema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    avatar: {type: String},
    posts: {type: Number, default: 0}

})


module.exports = model('User', userShema)