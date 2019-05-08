
let Vimeo = require('vimeo').Vimeo
//let client = new Vimeo("731ee7d3d226dda9e62c6f384a123ce31a68e657", "xbJIfsK1PAco3mUqWxPQe48xnmdYxIvucgtp+Xyw35a9IUSvFLmoyWGvhNqDAhydb+JEFyXm8NbM4l8PyBsGQQmU96gUWIquszKcsSPqm5JnrlOHwTPgp1etuENmjrCe", "303933494a86f9c71105c6eb193e466b");
const fs = require('fs')
const accessToken = '0d78832e1e432c53250088a092b5e357'
const clientId = '8d4acca002a1a612389b385bc475821ed3048726'
const clientSecret = 'Sv83mIA3tmpVJtVDRm0FHbGsDoroOEP14TJTzTOSB67EVhFPHgZT9km55ZloDIG8mjT2UASee0WUMgJNRWdB5cJ42K90FhzMpFqOnGxcu3gvAbLj9FXVdCDx+MF2BiNs'

// const accessToken = '769494640e4eec3a3d32c30da8859390'
// const clientId = '8a6516d51e192157db8815216dac1696'
// const clientSecret = 'nfND/s4y9XHYbWfWUbqWZqnJ6dSep4uihnMrpV6mZ3J/pSncjWJgvbvzGE/PAAtSRXBQq+vq0fhj2rkNhVNzVrGFYbT8DbFFmMpEGdtsv3pLG0pOUl8Dfd596ZQ8QHix'


let client = new Vimeo(clientId, clientSecret, accessToken)

module.exports = function (file_name, onSuccess, onError) {
  client.upload(
    file_name,
    {
      'name': file_name,
      'description': 'World'
    },
    function(uri) {
      fs.unlink(file_name, () => {
        onSuccess(uri)
      })
    },
    function (bytes_uploaded, bytes_total) {
      var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
      console.log(bytes_uploaded, bytes_total, percentage + '%')
    },
    function(error) {
      fs.unlink(file_name, () => {
        onError(error)
      })
    },
  )
}
