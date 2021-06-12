const {model, schema, Schema} = require('mongoose');

const postSchema = new Schema({
    body: String,
    password: String,
    createdAt: String,
    username: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String,
        }
    ],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Post',postSchema);