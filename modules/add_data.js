var mongoose=require('mongoose');
mongoose.connect(process.env.MONGODB_URI ||'mongodb+srv://Kamal:Pkam@9067@cluster0.eluze.mongodb.net/Mern?retryWrites=true&w=majority',{useNewUrlParser:true,useCreateIndex:true});
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