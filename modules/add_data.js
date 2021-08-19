var mongoose=require('mongoose');
var dotenv=require('dotenv');
dotenv.config({path: './config.env'});
const DB=process.env.DATABASE;
mongoose.connect(DB,{useNewUrlParser:true,useCreateIndex:true});
var conn=mongoose.connection;
var dataSchema=new mongoose.Schema({
    name:{
        type:String,
        
    },
    bio:{
        type:String,
    
    },
});
var dataModel=mongoose.model('data',dataSchema);
module.exports=dataModel;