const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} =  require('../../config');
const {UserInputError} = require('apollo-server');
const {validationRegisterInput, validateLoginInput} = require('../../util/validator');

function generateToken(res){
    return  jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username
    }, SECRET_KEY, {
        expiresIn: '1h'
    });
}

module.exports = {
    Mutation: {
        async login(_,{username,password}){
            const { valid, errors } = validateLoginInput(username, password);
          
            if(!valid){
                throw new UserInputError('Errors',{errors});
            }

            const user = await User.findOne({username});
            if(!user){
                errors.general = 'user not found';
                throw new UserInputError('Wrong Credentials',{errors});
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = 'password incorrect';
                throw new UserInputError('Wrong Credentials',{errors});
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register
        (_, 
         {registerInput: {username, password, confirmPassword, email}
        }, 
        context, 
        info){
            const { valid, errors } = validationRegisterInput(username, password, confirmPassword, email);
            if(!valid){
                throw new UserInputError('Errors',{errors});
            }
            const user = await User.findOne({username});
            if(user){
                throw new UserInputError('Username is token',{
                    errors:{
                        username: 'This username is taken'
                    }
                })
            }
            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}