var express = require('express');
var app = express();
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const vimeoUpload = require('./upload')
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index')
});

app.post('/upload', upload.single('file'), function (req, res, next) {
  console.log(req.file)
  vimeoUpload(req.file.filename)
})

app.listen(3000, function () {
  console.log("listen 3000");
})