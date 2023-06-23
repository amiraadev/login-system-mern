const LocalStartegy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { getUserByMail } = require('../usefullMethods');


 function initialize(passport) {

    const authenticateUsers = async (email , password ,done) => {
        const user = getUserByMail(email);
        if(user == null){
            return done(null , false,{message:"No user found with that mail"})
        }
        try {
            if(await bcrypt.compare(password,user.password)){
                return done(null,user)
            }
        } catch (error) {
            console.log(error);
            return done(error)
        }

    }

    passport.use(new LocalStartegy({usernameField:"email"}));
    passport.serializeUser((user,done) => {})
    passport.deserializeUser((user,done) => {})
    
}

module.exports = initialize