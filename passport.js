var passport = require('passport');
var Hospital = require('./models/hospital');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app){
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user,done){
        done(null, user.id);
    });
    passport.deserializeUser(function(id,done){
        Hospital.findById(id,function(err,user){
            done(null,user);
        });
    });
    passport.use('login',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req,email,password,done){
        Hospital.findOne({'email': email},function(err,user){
            if(err){
                console.log(err);
            }
            if(user){
                console.log("User already registered");
                return done(null, false, {message: "User already registered"});
            }
            if(!user.checkPassword(password))
                return done(null,false,{message: "Incorrect Password"});

            return done(null,user);
        });
    }
));
}