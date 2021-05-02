var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/insta',{useNewUrlParser:true,useCreateIndex:true});
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