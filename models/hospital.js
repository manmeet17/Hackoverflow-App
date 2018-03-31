var mongoose=require('mongoose');
var bcrypt=require('bcrypt');

var hospitalSchema= new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    location: String,
    treatments: {
        name: String,
        category: String,
        vaccine: String, 
    }
});

hospitalSchema.methods={
    checkPassword: function(inputPass){
        return bcrypt.compareSync(inputPass,this.password);
    },

    hashPassword: function(password){
        return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
    }
}

var Hospital=mongoose.model('Hospital',hospitalSchema);

module.exports=Hospital;