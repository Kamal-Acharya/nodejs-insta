var mongoose=require('mongoose');
var dotenv=require('dotenv');
dotenv.config({path: './config.env'});
const DB=process.env.DATABASE;
mongoose.connect(DB,{useNewUrlParser:true,useCreateIndex:true});
// mongoose.connect(process.env.MONGODB_URI ||'mongodb+srv://Kamal:Pkam@9067@cluster0.eluze.mongodb.net/Mern?retryWrites=true&w=majority',{useNewUrlParser:true,useCreateIndex:true});
var conn=mongoose.connection;
var uploadSchema=new mongoose.Schema({
 imagename:String
});
var picModel=mongoose.model('profile',uploadSchema);
module.exports=picModel;