const passport = require("passport");
const passportJWT = require("passport-jwt");
const dotenv = require("dotenv")
dotenv.config();

const {User} = require("../models");

const {SECRET_KEY} = process.env;

const {ExtractJwt} = passportJWT;
const {Strategy} = passportJWT;

const params = {
    secreteOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
/*
1. Извлечь JWT-токен из запроса
*/
passport.use(
    new Strategy(params, async (payload, done)=> {
        try {
            const user = await User.findOne({_id: payload.id});
            done(null, user)
        }
        catch (error){
            done(error)
        }
        
    })
)
