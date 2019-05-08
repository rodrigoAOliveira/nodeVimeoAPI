const Vimeo = require('vimeo').Vimeo
const fs = require('fs')

const accessToken = '57d78d48cfaf80268b6eb6a64ccd6576'
const clientId = '731ee7d3d226dda9e62c6f384a123ce31a68e657'
const clientSecret = 'zX7JTeeQj0lr8FMnRmrm4kZUb7/BACtPUoWqYtf3pKv6pPlWEEOBPyMqNWXr+kFLoKv/rVuaZpSDLUGp5ZFNgpsxtKiHCSPJ9FyUbNAFVt8t/HA2IESh1nqYdhJ1G84P'

let client = new Vimeo(clientId, clientSecret, accessToken)

const checkStatus = function (uri, callback, onError) {
  client.request(uri + '?fields=transcode.status', function (error, body, status_code, headers) {
    if (body.transcode.status === 'complete') {
      callback(uri)
    } else if (body.transcode.status === 'in_progress') {
      checkStatus(uri, callback, error)
    } else {
      onError('fail on process')
    }
  })
}

module.exports = function (file_name, onSuccess, onError) {
  client.upload(
    file_name,
    {
      'name': 'Hello',
      'description': 'World'
    },
    function (uri) {
      fs.unlink(file_name, () => {
        checkStatus(uri, onSuccess, onError)
      })
    },
    function (bytes_uploaded, bytes_total) {
      var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
      console.log(bytes_uploaded, bytes_total, percentage + '%')
    },
    function (error) {
      fs.unlink(file_name, () => {
        onError(error)
      })
    }
  )
}
