var mongoose=require('mongoose');var dotenv=require('dotenv');
dotenv.config({path: './config.env'});
const DB=process.env.DATABASE;
mongoose.connect(DB,{useNewUrlParser:true,useCreateIndex:true});
var conn=mongoose.connection;
var uploadSchema=new mongoose.Schema({
 imagename:String
});
var uploadModel=mongoose.model('image',uploadSchema);
module.exports=uploadModel;