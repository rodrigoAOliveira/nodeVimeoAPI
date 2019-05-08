const Vimeo = require('vimeo').Vimeo
const helper = require('./helper.js')

const accessToken = '57d78d48cfaf80268b6eb6a64ccd6576'
const clientId = '731ee7d3d226dda9e62c6f384a123ce31a68e657'
const clientSecret = 'zX7JTeeQj0lr8FMnRmrm4kZUb7/BACtPUoWqYtf3pKv6pPlWEEOBPyMqNWXr+kFLoKv/rVuaZpSDLUGp5ZFNgpsxtKiHCSPJ9FyUbNAFVt8t/HA2IESh1nqYdhJ1G84P'

let client = new Vimeo(clientId, clientSecret, accessToken)

module.exports = function (file_name, onSuccess, onError) {
  client.upload(
    file_name,
   
    async function(uri) {
      const videoProcessing = await helper(uri, client);

       client.request(uri + '?fields=link', (error, body) => {
            if(body.link){
                onSuccess(body.link);
            }
        });

    },
    function (bytes_uploaded, bytes_total) {
      var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
      console.log(bytes_uploaded, bytes_total, percentage + '%')
    },
    function(error) {
      
        onError(error)
      
    },
  )
}