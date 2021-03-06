var express = require('express')
var app = express()
var fileUpload = require('express-fileupload')
const upload = require('./upload')
app.set('view engine', 'ejs')
app.use(fileUpload())

app.get('/', function (req, res) {
  res.render('index')
})

app.post('/upload', function (req, res, next) {
  const file = req.files.file
  file.mv('./tmp/' + file.name, function () {
    upload('./tmp/' + file.name,
      function (uri) {
        res.render('videos', { uri })
      },
      function (error) {
        res.send('error: ' + error)
      }
    )
  })

})
const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log('listen '+port)
})



