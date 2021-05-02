var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/insta',{useNewUrlParser:true,useCreateIndex:true});
var conn=mongoose.connection;
var userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});
var userModel=mongoose.model('user',userSchema);
module.exports=userModel;