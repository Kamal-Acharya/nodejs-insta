var mongoose=require('mongoose');
mongoose.connect('mongodb+srv://Kamal:Pkam@9067@cluster0.eluze.mongodb.net/Mern?retryWrites=true&w=majority',{useNewUrlParser:true,useCreateIndex:true});
var conn=mongoose.connection;
var uploadSchema=new mongoose.Schema({
 imagename:String
});
var uploadModel=mongoose.model('image',uploadSchema);
module.exports=uploadModel;