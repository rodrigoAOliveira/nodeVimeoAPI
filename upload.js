let Vimeo = require('vimeo').Vimeo;
//let client = new Vimeo("731ee7d3d226dda9e62c6f384a123ce31a68e657", "xbJIfsK1PAco3mUqWxPQe48xnmdYxIvucgtp+Xyw35a9IUSvFLmoyWGvhNqDAhydb+JEFyXm8NbM4l8PyBsGQQmU96gUWIquszKcsSPqm5JnrlOHwTPgp1etuENmjrCe", "303933494a86f9c71105c6eb193e466b");




const accessToken = "769494640e4eec3a3d32c30da8859390";
const clientId = "8d4acca002a1a612389b385bc475821ed3048726";
const clientSecret = "Sv83mIA3tmpVJtVDRm0FHbGsDoroOEP14TJTzTOSB67EVhFPHgZT9km55ZloDIG8mjT2UASee0WUMgJNRWdB5cJ42K90FhzMpFqOnGxcu3gvAbLj9FXVdCDx+MF2BiNs";

let client = new Vimeo(clientId,clientSecret,accessToken);


module.exports = function (file_name) {
    client.upload(
        file_name,
        {
            'name': 'Untitled',
            'description': 'The description goes here.'
        },
        function (uri) {
            console.log('Your video URI is: ' + uri);
        },
        function (bytes_uploaded, bytes_total) {
            var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
            console.log(bytes_uploaded, bytes_total, percentage + '%')
        },
        function (error) {
            console.log('Failed because: ' + error)
        }

    )
}