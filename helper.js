module.exports = function waitProccess(uri, client){
	return new Promise((resolve, reject) => {
		const interval = setInterval(() => { 
		client.request(uri + '?fields=transcode.status', (error, body) => {
		    let statusResponse = body.transcode.status;
		    console.log(statusResponse);

		    if(statusResponse !== "in_progress" ){
		        isReady = (statusResponse === "complete");
		        resolve( {
		            isReady,
		            error
								})
						clearInterval(interval);
		    }
		});

    }, 3000);
	})
      
};