var mongoose=require('mongoose');
var dotenv=require('dotenv');
dotenv.config({path: './config.env'});
const DB=process.env.DATABASE;
mongoose.connect(DB,{useNewUrlParser:true,useCreateIndex:true});
// mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://Kamal:Pkam@9067@cluster0.eluze.mongodb.net/Mern?retryWrites=true&w=majority',{useNewUrlParser:true,useCreateIndex:true});
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