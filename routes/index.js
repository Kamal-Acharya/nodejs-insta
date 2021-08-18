var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var jwt = require('jsonwebtoken');
const { PassThrough } = require('stream');
//image schema
var image = require('../modules/image');
var user = require('../modules/user');
var pic=require('../modules/pic');
var data=require('../modules/add_data');

var imagedata = image.find({});
var picdata = pic.find({});



/* GET home page. */
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
var getuser = localStorage.getItem('loginuser');
var bio = data.findOne({name:getuser});
var userdata = user.find({username:getuser});

function checkuserlogin(res, req, next) {
  var usertoken = localStorage.getItem('usertoken');
  try {
    var decoded = jwt.verify(usertoken, 'logintoken');
  } catch (err) {
    res.redirect("/login");
  }
  next();
}
// for uploading image from browser
router.use(express.static(__dirname + "./public/"));

var Storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
});

var upload = multer({
  storage: Storage
}).single('file');


var Storage = multer.diskStorage({
  destination: "./public/profiles/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
});

var profile = multer({
  storage: Storage
}).single('file');





router.get('/', function (req, res, next) {
  var getuser = localStorage.getItem('loginuser');
  if(getuser)
  {
    res.redirect('/account');
  }
  else{
  res.render('index', { title: 'Express', sucess: '' });
  }
});
router.post('/', function (req, res, next) {
  var username = req.body.username;
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  var userdetails = new user({
    username: username,
    name: name,
    email: email,
    password: password,
  });
  userdetails.save((err, doc) => {
    if (err) throw err;

    res.render('index', { title: 'Express', sucess: ' sucessfully logged in' });
  })
});



router.get('/account', checkuserlogin, function (req, res, next) {
  var getuser = localStorage.getItem('loginuser');
  imagedata.exec((err, doc) => {
    if (err) throw err;
userdata.exec((err,d)=>{
  if (err) throw err;
 
  picdata.exec((err,data)=>{
    if (err) throw err;



  res.render('account', { title: 'Express', records: doc,photo:data, user: getuser ,na:d.name});

});
});

  });
});

// upload section
router.get('/upload', checkuserlogin, function (req, res, next) {
  imagedata.exec((err, doc) => {
    if (err) throw err;

    res.render('upload', { title: 'Express', sucess: '', records: doc });
  })
});
router.post('/upload', upload, function (req, res, next) {
  var imagefile = req.file.filename;
  var sucess = req.file.filename + "uplaodedd";
  var imagedetails = new image({
    imagename: imagefile,
  });
  imagedetails.save((err, doc) => {
    if (err) throw err;
    imagedata.exec((err, doc) => {
      if (err) throw err;
      res.render('upload', { title: 'Express', records: doc, sucess: sucess });
    });
  });
});

//edit section
router.get('/account/edit/:id', function (req, res, next) {
  var imageid=req.params.id;
  var image=pic.findById(imageid);
  image.exec((err,doc)=>{
    if(err) throw err;
    res.render('edit',{sucess:'sucess',id:imageid,records:doc});
  });
  });
  
  router.post('/account/edit/', profile,function (req, res, next) {
     var getpasscatid = req.body.id;
    var image=req.file.filename;
    var updatepasscat = pic.findOneAndReplace(getpasscatid, {imagename:image });
    updatepasscat.exec((err, doc) => {
      if (err) throw err;
      res.redirect('/account');
    });
  });


// deleting photo section
router.get('/account/delete/:id', function (req, res, next) {
  var imageid = req.params.id;
  console.log(imageid);
  var imagedelete = image.findByIdAndDelete(imageid);
  imagedelete.exec((err, doc) => {
    if (err) throw err;
    res.redirect('/account');
  });

});

//login section

router.get('/login', function (req, res, next) {
  var getuser = localStorage.getItem('loginuser');
  if(getuser)
  {
    res.redirect('/account');
  }
  else{
    res.render('login', { title: 'Express', sucess: '' });
  }
});
router.post('/login', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var checkuser = user.findOne({ username: username });
  checkuser.exec((err, doc) => {
    if (err) throw err;
    var getuserid = doc._id;
    var getpass = doc.password;
    if (getpass == password) {
      var token = jwt.sign({ userid: getuserid }, 'logintoken');

      localStorage.setItem('usertoken', token);
      localStorage.setItem('loginuser', username);
      res.redirect('/account');
    }
    else {
      res.render('login', { sucess: 'INVALID USERNAME OR PASSWORD' });
    }
  })


});

//logout section
router.get('/logout', function (req, res, next) {
  localStorage.removeItem('loginuser');
  localStorage.removeItem('usertoken');
  res.redirect('/login');
});



//profile image upload
router.get('/profile', checkuserlogin, function (req, res, next) {
  picdata.exec((err, doc) => {

    if (err) throw err;

    res.render('profile', { title: 'Express', sucess: '', records: doc });
  })
});
router.post('/profile',profile , function (req, res, next) {
  var imagefile = req.file.filename;
  var sucess = req.file.filename + "uplaodedd";
  var imagedetails = new pic({
    imagename: imagefile,
  });
  imagedetails.save((err, doc) => {
    if (err) throw err;
    picdata.exec((err, doc) => {
      if (err) throw err;
      res.render('profile', { title: 'Express', records: doc, sucess: sucess });
    });
  });
});
//--------------------------------------------------------------------------------------
// router.get('/add',checkuserlogin, function (req, res, next) {
//   picdata.exec((err,data)=>{
//     if (err) throw err;
//   res.render('add', { title: 'Express', sucess: '' ,fail:'' ,photo:data});
//   });
// });
// router.post('/add', function (req, res, next) {
//   var getuser = localStorage.getItem('loginuser');
//   var username = req.body.user;
//   var bio = req.body.bio;
//   var userdata = new data({
//   name:username,
//   bio:bio,
//   });
//   if(username==getuser)
//   {
//   userdata.save((err, doc) => {
//     if (err) throw err;
// res.redirect('/account');
//   });
// }
// else
// {
//   res.redirect('/account');
// }
// });


module.exports = router;
