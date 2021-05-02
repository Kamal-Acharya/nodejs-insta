var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/insta',{useNewUrlParser:true,useCreateIndex:true});
var conn=mongoose.connection;
var uploadSchema=new mongoose.Schema({
 imagename:String
});
var uploadModel=mongoose.model('image',uploadSchema);
module.exports=uploadModel;