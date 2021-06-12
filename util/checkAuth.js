const {AuthenticationError} = require('apollo-server');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');

module.exports = (context) =>{
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = jwt.verify(token,SECRET_KEY)
                return user;
            }catch(err){
                throw new AuthenticationError('Invalid token');
            }
        }
        throw new Error('Token must be valid: Bearer [token]');
    }
    throw new Error('authorization header must be provided');
}