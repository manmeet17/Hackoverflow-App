var Hospital = require('../models/hospital');

module.exports=function(app,passport){

    app.get('/',(req,res) =>{
        res.redirect('/hospital/login');
    });

    app.get('/user',(req,res) =>{
        if(req.user){
            res.status(200).json({
                status: 1,
                user: req.user
            });
        }
        else{
            res.status(404).json({
                status: 0,
                user: null,
                message: "User not logged in"
            });
        }
        
    });
    app.get('/hospital/login',(req,res)=>{
        res.render('index.ejs');
    });
    app.post('/hospital/login', passport.authenticate('login',{
        successRedirect: '/user',
        failureRedirect: '/hospital/login',
    }));

    app.post('/hospital/register',(req,res) =>{
       Hospital.findOne({'email': req.email},function(err,user){
           if(err) console.log(err);
           if(user){
               console.log("User is already signed up");
           }
           else{
               var hospital = new Hospital();
                hospital.name=req.body.name;
                hospital.email=req.body.email;
                hospital.location= req.body.location;
                hospital.password= hospital.hashPassword(req.body.password); 
               hospital.save(function(err){
                   if(err) console.log(err)
               });
               res.status(200).json({
                   user: hospital
               });
               console.log("Successfully registered");
           }
       });
    });

    app.get('/hospital/logout',(req,res) =>{
        if(req.user){
            req.logout();
            res.json({
                message: "User logged out"
            });
        }
        else{
            res.json({
                message: "No user found"
            });
        }
    });
}